const { Notes } = require("../model/notes.model");

const notes = async (req, res) => {
          try{
                    const {note} = req.body;
                    if(!note){
                              return res.status(404).send({
                                        message:"Please enter a note"
                              })
                    }
                    const notes = new Notes({
                              note
                    })
                    await notes.save();
                    res.status(200).send({
                              notes
                    });
          }catch(e){
                    res.status(500).send({
                              message: "Error in API notes",
                              error: e.message
                    })
          }
}

module.exports = {notes}