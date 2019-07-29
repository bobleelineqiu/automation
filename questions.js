const config = require('./config/default');

exports.startQuestions = [
    {
        type: 'input',
        name: 'keyword',
        message: '想要什么图片啊?',
        validate: function(keyword) {
            const done = this.async();
            if(keyword === '' || keyword == undefined ){
                done('Please enter the keyword to get pictures');
                return;
            }
            done(null, true);
        }
    }
];

exports.confirmClean = [
    {
        type: 'confirm',
        name: 'isRemove',
        message: `Do you want to remove all pictures in ${config.outputPath} ?`,
        default: true,
    }
];