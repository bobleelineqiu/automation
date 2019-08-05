const program = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');
const pkg = require('./package.json');
const qs = require('./questions');
const App = require('./app');
const Jenkins = require('./work');
const imgText = require("./utils/text");

console.log(chalk.cyan(imgText()));
program
    .version(pkg.version, '-v, --version');

program
    .command('search')
    .alias('s')
    .description('Get search pictures what you want.')
    .action(async () => {
        const answers = await inquirer.prompt(qs.startQuestions)
        const app = new App(answers);
        await app.start();
    });
program
.command('jenkins')
.alias('j')
.description('jenkins')
.action(async () => {
    const jenkins = new Jenkins();
    await jenkins.start();
});
program
.command('nituwang')
.alias('nitu')
.description('获取昵图信息')
.action(async () => {
    // const answers = await inquirer.prompt(qs.startQuestions);
    const app = new App();
    await app.start();
});
program
    .command('*')
    .description('Not supposed commander.')
    .action(() => program.help());
    
program.parse(process.argv);

if(process.argv.length < 3){
    program.help();
}