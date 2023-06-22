import Proposal from '../../../models/proposal';
import dbConnect from '../../../lib/mongodb';
import handler from '../../../lib/handler';

handler
  .post(createProposal)

async function createProposal(req, res) {

  const data = req.body;

  const { id, image } = data;

  dbConnect();

  const proposal = await Proposal.findOneAndUpdate({id:ObjectId(id)},{image: image})

  res.status(201).json({ 
    message: 'Updated proposal!'
});

}

export default handler;