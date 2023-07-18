const youtube = async (req, res) => {
  try {
    const id = req.query.id;
    const key = process.env.YOUTUBE_API_KEY;

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${key}`,
      {
        method: 'GET'
      }
    );
    const data = await response.json();

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      error: 'there was an error' + error
    });
  }
};

export default youtube;
