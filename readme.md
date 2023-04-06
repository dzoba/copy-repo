# Repo Loader

Repo Loader is a command-line tool that reads code from files in a JavaScript repository and outputs their content into a single text file. It's designed to be used with language models like GPT-X, LLMs, and other natural language processing tasks.

## Installation

To install Repo Loader globally, run the following command:

```sh
$ npm install -g copy-repo
```

## Usage
After installing, you can use the copy-repo command:

```
$ copy-repo <repository_path> <output_file_path> [-c /path/to/config.json]
```


## Arguments
- `<repository_path>`: The path to the JavaScript repository you want to process.
- `<output_file_path>`: The path to the output text file where the code will be written.
- `-c /path/to/config.json` (optional): The path to a JSON configuration file to customize the included and excluded files.

## Configuration
Repo Loader supports a configuration file in JSON format. By default, it includes all .js files in the repository and excludes files in the node_modules folder. You can customize this behavior using the include and exclude properties in the configuration file:

```
{
  "include": ["**/*.js"],
  "exclude": ["node_modules/**"]
}
```

- `include`: An array of glob patterns to specify the files that should be included in the output. By default, it includes all .js files.
- `exclude`: An array of glob patterns to specify the files that should be excluded from the output. By default, it excludes all files in the node_modules folder.

## Example

To run Repo Loader on a sample JavaScript repository and output the code to a file called output.txt, you can use the following command:

```
$ copy-repo /path/to/js/repo /path/to/output.txt
```

If you have a custom configuration file, you can specify it using the -c option:
```
$ copy-repo /path/to/js/repo /path/to/output.txt -c /path/to/config.json
```

## License

MIT License