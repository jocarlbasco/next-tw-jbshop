import Order from '@/models/Order';
import db from '@/utils/db';

const { getSession } = require('next-auth/react');

const handler = async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).send({ message: 'Sign In required' });
  }

  const { user } = session;

  await db.connect();
  const orders = await Order.find({ user: user._id });
  await db.disconnect();
  res.send(orders);
};

export default handler;
