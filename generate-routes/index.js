const filesRoutes = require('./files-routes')

module.exports = {
    getRoutes: function(){
        return getFilesRoutes()
    }
}

getFilesRoutes = async function () {
  console.log('#### Generating files routes list ####')
  let routes = Object.keys(filesRoutes)
  // console.log(routes)
  let newRoutes = []
  await routes.forEach(route => {
    let path = route.replace(/_/g, '/')
    // console.log("/"+path)
    newRoutes.push("/"+path)
  })
  console.log(newRoutes)
  return newRoutes
}
// return getFilesRoutes()
