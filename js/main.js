/*!
 * Project main function
 * author: BGOnline
 * version 1.0 2016-3-11
 * http://www.bgonline.cn
 */

function main() {

    this.IEAlert = function() { $('body').iealert(); }
    

};

var Main = new main();

//Function initialization
jQuery(document).ready(function($) {
    
  Main.IEAlert();
  
});
