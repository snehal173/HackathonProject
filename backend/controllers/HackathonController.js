const HackathonModel=require("../models/hackathonModal")

const getAllHackathons = async (req, res) => {
  try {
    const hackathons = await HackathonModel.find({});

    return res.status(200).json({
      message: "All hackathons fetched successfully",
      hackathons
    });

  } catch (error) {
    console.error("Error fetching hackathons:", error);
    return res.status(500).json({
      message: "Error while fetching all hackathons"
    });
  }
};

module.exports={getAllHackathons}