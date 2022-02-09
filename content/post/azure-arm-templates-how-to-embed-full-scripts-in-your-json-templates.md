+++
author = "jldeen"
date = 2017-09-05T11:41:02Z
description = ""
draft = false
image = "Screen-Shot-2017-09-05-at-11.27.52_cht85n.png"
slug = "azure-arm-templates-how-to-embed-full-scripts-in-your-json-templates"
title = "Azure ARM Templates - How to embed full scripts in your JSON templates!"

+++


Earlier today a colleague and I discovered a pretty neat trick when dissecting a broken ARM template; we learned you can encode complete scripts and embed them in your templates. This post will explain how to do so. First, some assumptions:

- You have a Linux/Unix based machine available (terminal on Mac works fine, as does Bash on Windows 10)
- You are familiar with JSON and ARM templates
- You are familiar with shell scripts on some level

Using base64 and gzip you can encode and decode strings, which can then be used in your templates. Here’s an example:

H4sIAIY0qlkAAyvJyCxWAKJEhZLU4hIuABITBXIPAAAA

The above output says, “This is a test” without any quotations. To get that output, from your terminal, you would type:

echo 'this is a test' | gzip | base64

The above command takes your string, uses gzip to compress it, and base64 to binarily encode it. The output you receive should be similar to the one above. To decode you would type a similar command, but in reverse:

echo 'H4sIAIY0qlkAAyvJyCxWAKJEhZLU4hIuABITBXIPAAAA' | base64 -D | gunzip

Like the encoding command, you’re taking your binary base64 string, decoding it, and decompressing the output using gunzip. Note the ‘-D’ switch in your base64 – that tells base64 to decrypt your string from binary data in ASCII string format to standard output.

Let’s say you have a file you want to compress and encoding. To do so, you would cat the file, pipe the output to gzip to compress, and another pipe to base64 to encoding. Here are two examples:

cat test.sh | gzip | base64

or

a=$(cat test.sh) echo $a | gzip | base64

Now, the next question is, “How do I use that string in my ARM template?”  The answer is you take the output provided and use that in your custom data section. Be sure to use the ‘\n’ (no quotes) to specify the new line character after the end of the output string. Here’s an example:

"customData": "[base64(concat('#cloud-config\n\nwrite_files:\n - encoding: gzip\n content: !!binary |\n H4sIAIY0qlkAAyvJyCxWAKJEhZLU4hIuABITBXIPAAAA\n path: /opt/azure/configure-test-template.sh\n permissions: \"0744\"\n\n',variables('agentRunCmdFile'),variables('agentRunCmd')))]"

As you can see, the example specifies base64 binary content and tells us our data is encoded using gzip. After each section, we see the ‘\n’ to specify a break in our custom data. When the template deploys, the encoded script/command used will be decrypted and decompressed on the fly, and then either copied to the location or executed accordingly. You will want to update your template file as necessary to reference the appropriate paths and variables of course, but the above gives you a general example.

To view a complete example, you can check out the JSON template I updated [here](https://github.com/Azure/azure-quickstart-templates/blob/master/101-acsengine-swarmmode/azuredeploy.json) – specifically lines 945 and 1181.

