import Proposal from '../../../models/proposal';
import dbConnect from '../../../lib/mongodb';
import handler from '../../../lib/handler';

handler
  .get(getProposal)

async function getProposal(req, res) {

  const data = req.body;

  const { id } = data;

  dbConnect();

  const proposal = await Proposal.findById(id)

  const proposalId = proposal._id.toString()
  const proposalTitle = proposal.title
  const proposalDescription = proposal.description

  res.status(201).json({
    id: proposalId,
    title: proposalTitle,
    description: proposalDescription
});

}

export default handler;