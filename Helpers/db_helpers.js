exports.create_user_if_new = function(controller,id,team,ts){
  controller.storage.users.get(id, function (err, user) {
  if (err) {
    console.log(err)
  }
  else if (!user) {
    controller.storage.users.save({id: id, team: team,created_at: ts})
  }
})
}
