// START 11TY imports
import eleventyNavigationPlugin             from "@11ty/eleventy-navigation";
import { InputPathToUrlTransformPlugin }    from "@11ty/eleventy";
import { eleventyImageTransformPlugin }     from "@11ty/eleventy-img";
import { EleventyHtmlBasePlugin }           from "@11ty/eleventy";
// END 11TY imports

// START LibDoc imports
import libdocConfig                         from "./_data/libdocConfig.js";
import libdocFunctions                      from "./_data/libdocFunctions.js";
// END LibDoc imports

// AK imports
import * as util from 'util';
import Image from "@11ty/eleventy-img";
import * as path from 'path';
import { escapeAttribute } from "entities";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";

export default function(eleventyConfig) {
    // START PLUGINS
    eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
    eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);
    eleventyConfig.addPlugin(eleventyNavigationPlugin);
    //eleventyConfig.addPlugin(eleventyImageTransformPlugin, libdocFunctions.pluginsParameters.eleventyImageTransform());
    // END PLUGINS 

    eleventyConfig.addPlugin(syntaxHighlight, {

        // Line separator for line breaks
        lineSeparator: "\n",

        // Change which Eleventy template formats use syntax highlighters
        templateFormats: ["*"], // default

        // Use only a subset of template types (11ty.js added in v4.0.0)
        // templateFormats: ["liquid", "njk", "md", "11ty.js"],

        // init callback lets you customize Prism
        init: function({ Prism }) {
        Prism.languages.myCustomLanguage = { /* … */ };
        },

        // Added in 3.1.1, add HTML attributes to the <pre> or <code> tags
        preAttributes: {
        tabindex: 0,

        // Added in 4.1.0 you can use callback functions too
        "data-language": function({ language, content, options }) {
            return language;
        }
        },
        codeAttributes: {},

        // Added in 5.0.0, throw errors on invalid language names
        errorOnInvalidLanguage: false,
    });
    
    // START FILTERS
    eleventyConfig.addAsyncFilter("autoids", libdocFunctions.filters.autoids);
    eleventyConfig.addAsyncFilter("embed", libdocFunctions.filters.embed);
    eleventyConfig.addAsyncFilter("cleanup", libdocFunctions.filters.cleanup);
    eleventyConfig.addAsyncFilter("dateString", libdocFunctions.filters.dateString);
    eleventyConfig.addAsyncFilter("datePrefixText", libdocFunctions.filters.datePrefixText);
    eleventyConfig.addAsyncFilter("toc", libdocFunctions.filters.toc);
    // END FILTERS

    // START COLLECTIONS
    eleventyConfig.addCollection("myTags", libdocFunctions.collections.myTags);
    eleventyConfig.addCollection("postsByDateDescending", libdocFunctions.collections.postsByDateDescending);
    // END COLLECTIONS

    // START SHORTCODES
    eleventyConfig.addShortcode("alert", libdocFunctions.shortcodes.alert);
    eleventyConfig.addPairedShortcode("alertAlt", libdocFunctions.shortcodes.alert);
    eleventyConfig.addShortcode("embed", libdocFunctions.shortcodes.embed);
    eleventyConfig.addShortcode("icomoon", libdocFunctions.shortcodes.icomoon);
    eleventyConfig.addShortcode("icon", libdocFunctions.shortcodes.icon);
    eleventyConfig.addShortcode("iconCard", libdocFunctions.shortcodes.iconCard);
    eleventyConfig.addPairedShortcode("sandbox", libdocFunctions.shortcodes.sandbox);
    eleventyConfig.addPairedShortcode("sandboxFile", libdocFunctions.shortcodes.sandboxFile);
    // END SHORTCODES

    // START FILE COPY
	eleventyConfig.addPassthroughCopy("sandboxes");
    eleventyConfig.addPassthroughCopy("assets");
    eleventyConfig.addPassthroughCopy("core/assets");
    eleventyConfig.addPassthroughCopy("favicon.ico");
    // END FILE COPY

    // AK experiments
    // eleventyConfig.addBundle("css");
    // eleventyConfig.addBundle("js");

    // Serialize to console filter {{ collections.post | console }}
    eleventyConfig.addFilter('console', function(value) {
        const str = util.inspect(value);
        return `<div style="white-space: pre-wrap;">${unescape(str)}</div>;`
    });

	// eleventyConfig.addShortcode("image", async function (src, alt, widths = [800, 1920], sizes = "") {
	// 	return Image(src, {
	// 		widths,
	// 		formats: ["avif", "jpeg"],
    //         filenameFormat: function (id, src, width, format, options) {
	// 	        const extension = path.extname(src);
	// 	        const name = path.basename(src, extension);

	// 	        return `${id}-${width}w.${format}`;
	//         },            
	// 		returnType: "html",    // new in v6.0
	// 		htmlOptions: {         // new in v6.0
	// 			imgAttributes: {
	// 				alt,               // required, though "" works fine
	// 				sizes,             // required with more than one width, optional if single width output
	// 				loading: "lazy",   // optional
	// 				decoding: "async", // optional
	// 			}
	// 		},
    //         // outputDir: "./_site/img/"
	// 	});
	// });

	eleventyConfig.addShortcode("img", async function (src) {
		let metadata = await Image(src, {
			widths: [900, 1920],
			formats: ["jpeg"],
            outputDir: "./_site/img/"
		});

		let data0 = metadata.jpeg[0];
		let data1 = metadata.jpeg[1];
        // console.log(util.inspect(data0));
        // console.log(util.inspect(data1));
		return `<a href="${data1.url}" target="_blank"><img src="${data0.url}" width="${data0.width}" height="${data0.height}" alt="alt"></a>`;
	});


    
    return {
        pathPrefix: libdocConfig.htmlBasePathPrefix
    }
};