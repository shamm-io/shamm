import Proposal from '../../../models/proposal';
import dbConnect from '../../../lib/mongodb';
import handler from '../../../lib/handler';

handler
  .post(createProposal)

async function createProposal(req, res) {

  const data = req.body;

  const { title, category, goal, timeline, description } = data;

  dbConnect();

  const proposal = await Proposal.create(req.body)

  const id = proposal._id.toString()

  res.status(201).json({ 
    message: 'Created proposal!',
    id: id
});

}

export default handler;