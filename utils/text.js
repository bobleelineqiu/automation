const imgSpd = () => {
   /*
    ___      __    __  .___________.  ______   .___  ___.      ___   .___________. __    ______   .__   __. 
    /   \    |  |  |  | |           | /  __  \  |   \/   |     /   \  |           ||  |  /  __  \  |  \ |  | 
   /  ^  \   |  |  |  | `---|  |----`|  |  |  | |  \  /  |    /  ^  \ `---|  |----`|  | |  |  |  | |   \|  | 
  /  /_\  \  |  |  |  |     |  |     |  |  |  | |  |\/|  |   /  /_\  \    |  |     |  | |  |  |  | |  . `  | 
 /  _____  \ |  `--'  |     |  |     |  `--'  | |  |  |  |  /  _____  \   |  |     |  | |  `--'  | |  |\   | 
/__/     \__\ \______/      |__|      \______/  |__|  |__| /__/     \__\  |__|     |__|  \______/  |__| \__| 
                                                                                                             
   */
}

const imgText = () => {
    return imgSpd.toString().substring(
        imgSpd.toString().indexOf('/*') + 3,
        imgSpd.toString().lastIndexOf('*/')
    )
}
module.exports = imgText;
