const chunks = [
    "data: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"role\":\"assistant\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\"In\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\" field",
    "s\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\" ",
    "of\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\" gol",
    "d\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\"",
    ",\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\" th",
    "e\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\" sun\"},\"index\":0,\"finish_reason\":null}]}\n\n",
    "data: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\" desc",
    "\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\"en",
    "ds\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\"",
    ",\\n\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\"",
    "And\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\" shadow",
    "s\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\" grow",
    "\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\" with\"},\"index\":0,\"finish_reason\":null}]}\n\n",
    "data: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\" evening",
    "\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\" tr",
    "ends\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\"",
    ".\\n\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\"Bi",
    "rd\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\"",
    "s\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\" tak",
    "e\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\" fligh",
    "t\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\"",
    ",\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\" their",
    "\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\" song\"},\"index\":0,\"finish_reason\":null}]}\n\n",
    "data: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\" n",
    "ow\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\" ",
    "ends\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\"",
    ",\\n\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\"A",
    "s\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\" darknes",
    "s\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\" falls\"},\"index\":0,\"finish_reason\":null}]}\n\n",
    "data: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\"",
    ",\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\" the",
    "\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\" n",
    "ight\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\" ext",
    "ends\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\".\\n",
    "\\n\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\"Stars\"},\"index\":0,\"finish_reason\":null}]}\n\n",
    "data: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\" above\"},\"index\":0,\"finish_reason\":null}]}\n\n",
    "data: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\"",
    ",\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\" they",
    "\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\" t",
    "w\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\"inkl",
    "e\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\" br",
    "ight\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\"",
    ",\\n\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\"A",
    "\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\" gent",
    "le\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\" breez",
    "e\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\"",
    ",\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\" wi",
    "s\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\"p",
    "s\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\"",
    " of\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\" de",
    "light\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\"",
    ".\\n\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\"Natur",
    "e\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\"'",
    "s\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\" sym\"},\"index\":0,\"finish_reason\":null}]}\n\n",
    "data: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\"phon",
    "y\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\"",
    ",\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\" suc",
    "h\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\" a\"},\"index\":0,\"finish_reason\":null}]}\n\n",
    "data: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\" s",
    "ight\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\"",
    ",\\n\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\"To",
    "\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\" wat",
    "ch\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\" a",
    "nd\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\" liste",
    "n\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\"",
    " with\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\" p",
    "ure\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\" m",
    "ight\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\"",
    ".\\n\\n\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\"Fo",
    "r\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\" in\"},\"index\":0,\"finish_reason\":null}]}\n\n",
    "data: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\" th",
    "is\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\" mome",
    "nt\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\"",
    ",\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\" all\"},\"index\":0,\"finish_reason\":null}]}\n\n",
    "data: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\" seem",
    "s\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\" clea",
    "r\"},\"index\":0,\"finish_reason\":null}]}\n\n",
    "data: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\"",
    ",\\n\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\"T",
    "he\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\" wor",
    "ld\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\" a",
    "t\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\" peace\"},\"index\":0,\"finish_reason\":null}]}\n\n",
    "data: {\"id\":\"chatcmpl-7DFFCu",
    "B2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\",\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\" withou",
    "t\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\"",
    " a\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\" f",
    "ear\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\"",
    ".\\n\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\"",
    "A\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\" ",
    "moment\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\" cherished\"},\"index\":0,\"finish_reason\":null}]}\n\n",
    "data: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\"",
    ",\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\" o",
    "h\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\" so\"},\"index\":0,\"finish_reason\":null}]}\n\n",
    "data: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\" d",
    "ear\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\"",
    ",\\n\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\"As\"},\"index\":0,\"finish_reason\":null}]}\n\n",
    "data: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\" beauty\"},\"index\":0,\"finish_reason\":null}]}\n\n",
    "data: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\" surrou",
    "nds\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\"",
    ",\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\" ",
    "so\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\" ",
    "near\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\".\"},\"index\":0,\"finish_reason\":null}]}\n\n",
    "data: {\"id\":\"chatcmpl-7DFFCuB2XhY8ZNigZ4UuUz2uRiYWc\",\"object\":\"chat.completion.chunk\",\"created\":1683391218,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{},\"index\":0,\"finish_reason\":\"stop\"}]}\n\ndata: [DONE]\n\n"
];

describe('openai streaming chunk parser', function () {
    it('should parse chunks', async () => {

        let currentPart = '';
        for (let chunk of chunks) {
            let newlinepos = chunk.indexOf('\n\n');
            while(newlinepos >= 0) {
                currentPart += chunk.substring(0, newlinepos);

                if (currentPart.startsWith('data: {')) {
                    const currentPartObj = JSON.parse(currentPart.substring('data: '.length));
                    if (currentPartObj.choices[0].delta && currentPartObj.choices[0].delta.content) {
                        process.stdout.write(currentPartObj.choices[0].delta.content);
                    }
                }
                chunk = chunk.substring(newlinepos + 2);
                newlinepos = chunk.indexOf('\n\n');
                currentPart = '';
            }
            currentPart += chunk;
        }
    });
});