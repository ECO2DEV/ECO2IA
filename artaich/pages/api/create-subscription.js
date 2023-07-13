
const stripe = require('stripe')('sk_test_51MmF5HEZbX6Zpxv9cu17vK5ZbcYrLIWRB9F1beqlT5vYTzIxjJSN5vsTugGzAX4YOxYvfb2qluByAeAf1MTsWPoS00nvBF8VEJ');


export default async function handler(req, res) {
  
  if (req.method === 'POST') {
    const { price } = req.body;

    try {
      const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        line_items: [{
          price,
          quantity: 1,
        },
          
        ],
        customer: 'cus_OEB4HLV91e5FSn',
        //mode: 'payment',
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/cancele`,
      });
    
      res.send({url: session.url, sessionId : session.id})
     
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}