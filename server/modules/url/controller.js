import Url from './model';

export const createShort = async (req, res) => {
  const { longUrl } = req.body;
  const newUrl = new Url({ longUrl });

  try {
    return res.status(201).json({ url: await newUrl.save() });
  } catch (e) {
    return res.status(e.status).json({ error: true, message: 'Error with Url'});
  }
}
