const STRIPE_SECRET_KEY = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY;

const stripe = require('stripe')(
  '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'
);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { price, customerid, userId } = req.body;

    try {
      const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        line_items: [
          {
            price,
            quantity: 1
          }
        ],
        customer: customerid, //'cus_OEB4HLV91e5FSn',
        //mode: 'payment',
        // Send the price trhoug the url
        success_url: `${req.headers.origin}/pairoll/success?q=${price}&id=${userId}`,
        cancel_url: `${req.headers.origin}/pairoll/cancele`
      });

      res.send({ url: session.url, sessionId: session.id });
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
