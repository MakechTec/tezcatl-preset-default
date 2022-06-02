import CLI, {Reader, Writter} from "@makechtec/tezcatl-cli";
import Pipe from "@makechtec/pipe/pipe.js";
import BlockExtractor from "@makechtec/tezcatl-blocks";
import { cwd } from "node:process";

export const DefaultCLI = {
    run: function() {

        let template = CLI.getArgumentValue("name");
        let placeholders = CLI.getArgumentsGroup("ph");
        let file = CLI.getArgumentValue("file");
        let content = this.readContent(template.value);

        let p = new Pipe(content);

        p.addAction((content) => {
            return BlockExtractor.processConditions(content);
        })
        .addAction((content, placeholders) => {
            return Reader.changePlaceholders(content, placeholders);
        }, placeholders)
        .addAction((content, filename) => {
            return Writter.writeFile(filename, content);
        }, file.value);

        p.execActions();
    },

    readContent: (templateName) => {
        let userTemplatePath = USER_TEMPLATE_DIR + "/" + templateName;
        let defaultTemplatePath = DEFAULT_TEMPLATE_DIR + "/" + templateName;
        let content = Reader.readTemplate(userTemplatePath);

        if(content == ""){
            content = Reader.readTemplate(defaultTemplatePath);
        }

        return content;
    }
};

