const program = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');
const pkg = require('./package.json');
const qs = require('./questions');
const App = require('./app');

program
    .version(pkg.version, '-v, --version');

program
    .command('search')
    .alias('s')
    .description('Get search pictures what you want.')
    .action(async () => {
        const answers = await inquirer.prompt(qs.startQuestions);
        const app = new App(answers);
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