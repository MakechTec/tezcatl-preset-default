import {CLI,Reader, Writter} from "@makechtec/tezcatl-cli";
import {Pipe} from "@makechtec/pipe";
import { cwd } from "node:process";
import { ConditionalProcessor } from "@makechtec/tezcatl-conditional-processor";
import { IterativeProcessor } from "@makechtec/tezcatl-iterative-processor";

export const run = () => {

    let template = CLI.getArgumentValue("template");
    let file = CLI.getArgumentValue("file");
    let placeholders = CLI.getAllArguments();
    let content = readContent(template.value + EXT);

    let pipe = new Pipe(content);
    let conditionalProcessor = new ConditionalProcessor();
    let iterativeProcessor = new IterativeProcessor();



    pipe.addAction((newContent) => {
            return conditionalProcessor.parse(newContent);
        })
        .addAction((newContent) => {
            return iterativeProcessor.parse(newContent);
        })
        .addAction((newContent) => {
            return Reader.changePlaceholders(newContent, placeholders);
        })
        .addAction((newContent) => {
            Writter.writeFile(file.value, newContent);
        })
        .execActions();
};

export const readContent = (templateName) => {
    let userTemplatePath = USER_TEMPLATE_DIR + "/" + templateName;
    let defaultTemplatePath = DEFAULT_TEMPLATE_DIR + "/" + templateName;
    let content = Reader.readTemplate(userTemplatePath);

    if(content == ""){
        content = Reader.readTemplate(defaultTemplatePath);
    }
    return content;
};

export const USER_TEMPLATE_DIR = cwd() + "/templates";
export const DEFAULT_TEMPLATE_DIR = cwd() + "/node_modules/@makechtec/tezcatl-preset-default/templates";
export const EXT = ".temp";