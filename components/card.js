export default function Card(props) {
    let component;
    if (props.type == 'type1') {
        component = <div className="card col-span-12 md:col-span-6 lg:col-span-3 relative bg-card-bg border border-card-border shadow-card backdrop-blur-md rounded-2xl overflow-clip">
            <img src={props.img} width="300" height="150" className="object-cover h-[150px] bg-black opacity-[0.6]"></img>
            <div className="absolute top-2 right-3">
                <svg className="inline-block mr-1" xmlns="https://www.w3.org/2000/svg" width="13" height="13" fill="#FFDD2B" viewBox="0 0 16 16"> <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" fill="#FFDD2B"></path></svg>
                <span className="text-xs font-medium tracking-widest text-golden-yellow">{props.stars}</span>
            </div>
            <div className="px-5 py-1">
                <span className="text-faded-grey text-xs font-medium mb-1">{props.category}</span>
                <h2 className="text-white text-lg font-bold mb-1 whitespace-nowrap">{props.title}</h2>
                <p className="text-faded-grey text-xs font-medium mb-1 min-h-[80px]">{props.content}</p>
                <progress value={props.progress} max="100"></progress>
                <p className="text-base -mt-1.5 font-medium text-money-green mb-1">{props.amount} ETH Raised!</p>
                <a href="#" className="text-faded-grey text-xs font-medium mb-2 block">Learn More</a>
            </div>
        </div>;
    }
    else{
        component = <div className="card col-span-12 md:col-span-6 lg:col-span-3 relative bg-card-bg border border-card-border shadow-card backdrop-blur-md rounded-2xl overflow-clip">
            <img src={props.img} width="300" height="150" className="object-cover h-[250px] bg-black opacity-[0.6]"></img>
            <div className="absolute bottom-1 left-4 pr-4">
                <h2 className="text-white text-base font-bold mb-2 leading-5">{props.title}</h2>
                <p className="text-sm font-medium mb-1 text-money-green">{props.content}</p>
            </div>
        </div>;
    }
    return (component);
}
