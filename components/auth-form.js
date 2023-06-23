import { useState, useRef } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';


async function createUser(email, password, role) {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ email, password, role }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong!');
  }

  return data;
}

function AuthForm() {
  const [registered, setRegistered] = useState(false)
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const roleInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredRole = roleInputRef?.current?.value;

    // optional: Add validation

    if (isLogin) {
      await signIn('credentials', {
        redirect: '/',
        email: enteredEmail,
        password: enteredPassword,
      });

    } else {
      try {
        const result = await createUser(enteredEmail, enteredPassword, enteredRole);
        setRegistered(true)
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <section className='flex items-center justify-center shadow-accordion w-100 mx-auto flex-wrap backdrop-blur-btn bg-black/50 saturate-[180%] p-8 rounded-2xl'>
      {!registered ? (
        <>
          <div className='w-full'>
            <h1 className='mb-6 text-2xl font-semibold'>{isLogin ? 'Log In' : 'Sign Up'}</h1>
          </div>
          <form onSubmit={submitHandler} className='w-full'>
            <div>
              <input type='email' id='email' className='w-full bg-transparent mb-6 outline-0 border-b-gray-400 border-b-2 pb-2 focus:border-b-white transition-colors duration-200' placeholder='Email Address' required ref={emailInputRef} />
            </div>
            <div>
              <input
                type='password'
                id='password'
                placeholder='Password'
                className='w-full bg-transparent mb-6 outline-0 border-b-gray-400 border-b-2 pb-2 transition-colors duration-200 focus:border-b-white'
                required
                ref={passwordInputRef}
              />
              {isLogin ? '' : (
                <select
                  id='role'
                  className='w-full bg-transparent mb-10 outline-0 border-b-gray-400 border-b-2 pb-2 transition-colors duration-200 focus:border-b-white'
                  required
                  placeholder='Role'
                  ref={roleInputRef}
                >
                  <option value='user' className='bg-black/90'>User</option>
                  <option value='owner' className='bg-black/90'>Owner</option>
                </select>
              )}
            </div>
            <div className=''>
              <button className='button button-color mr-4 font-medium border-2 py-1 px-6 border-white rounded-md hover:bg-white hover:text-black transition-colors duration-200'>{isLogin ? 'Log In' : 'Create Account'}</button>
              <button
                type='button'
                onClick={switchAuthModeHandler}>
                {isLogin ? 'No Account? Create One' : 'Already a user? Login'}
              </button>
            </div>
          </form>
        </>
      ) : (
        <div className=''>
          <p>You have successfully registered!</p>

          <button onClick={() => router.reload()} className='button button-color'>Login Now</button>

        </div>
      )}

    </section>
  );
}

export default AuthForm;
