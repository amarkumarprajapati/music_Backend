const AWS = require("aws-sdk");
require("dotenv").config();

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

let getsingle = {};

// Get a list of all music files from the S3 bucket
getsingle.getAllMusic = async (req, res) => {
  const bucketName = "portfolioamarkumar";
  const s3Params = {
    Bucket: bucketName,
    Prefix: "MymusicList/",
  };

  try {
    const data = await s3.listObjectsV2(s3Params).promise();

    // Filter and return only the music files, excluding the prefix and ".mp3" extension
    const musicFiles = data.Contents.filter((item) => item.Key.endsWith(".mp3")) // Ensure only mp3 files are returned
      .map((item) => item.Key.replace("MymusicList/", "").replace(".mp3", ""));

    res.status(200).json({ musicFiles });
  } catch (error) {
    console.error("Error fetching music list from S3:", error);
    res.status(500).json({ error: "Error retrieving music list" });
  }
};

// Get the URL of a specific song from the S3 bucket by its name
getsingle.getMusicByName = async (req, res) => {
  const { songName } = req.body;

  if (!songName) {
    return res.status(400).json({ error: "Song name is required" });
  }

  const bucketName = "portfolioamarkumar";
  const key = `MymusicList/${songName}.mp3`;

  try {
    // Check if the song exists in the bucket
    await s3.headObject({ Bucket: bucketName, Key: key }).promise();

    // Generate the URL for the song
    const songUrl = `https://${bucketName}.s3.amazonaws.com/${key}`;
    res.status(200).json({ url: songUrl });
  } catch (error) {
    console.error("Error retrieving song from S3:", error);

    if (error.code === "NotFound" || error.code === "NoSuchKey") {
      res.status(404).json({ error: "Song not found in S3" });
    } else {
      res.status(500).json({ error: "Error retrieving song" });
    }
  }
};

module.exports = getsingle;
