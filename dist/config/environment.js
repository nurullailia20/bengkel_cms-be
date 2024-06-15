"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const config = {
    db: process.env.DB,
    jwt_public: `-----BEGIN PUBLIC KEY-----
MIICITANBgkqhkiG9w0BAQEFAAOCAg4AMIICCQKCAgB2Bga6LBUKrYZZc73vJ3Ew
iE6hVHFTobBxeFUjsg+QVXyC3Zw2kSXAHccIfc92qyeHH+6KQIJQnzVjXpEo7fdO
LZYwpRZchtihjONuxC8lB2qPPB1dd/USQeo2SQ9Cz/8CT/GgSi/thiD7KVnrRT/V
+UT+xncvGljaa80i/Pi++lr43ZHkLczYgqi3xiTXelaJAeOuJlrJP+KxggLtlUza
G7Ifs1CyMbkN43AJqjN/UcpOXl4HwKfEOGXa/DA5ASMwuEaskScGTNvYHOuIsoB4
/o+2VKAbddzkJo3wP6wu+9Oj0t1ZPGBZePk9hReEETHtpMZUSVVVSapRxM/stzzV
7XCalbJE7XbA5AJzZsxaj+F2vyGCu6NgONdrXegUwYRltw7ZBvJHc6bcQa7CMaVd
86mHhlakI7MlsBN8W2pUUnCe0/9ZHT6u5oUNzO7YGHwd0cq6x6qHZRcPawvo2nZk
TQg9vMF+EqHwR47c5AR5wwiW2IoVZgXQm9IwY/RZ67htSzalBGfInB0sUPuvy14M
HplorKbjobzH/hILDlhJfnRU+pAbStDMixM1Yi3XIKo5RACeaICbTPzQfwp8ojRa
2h9Mawo/DGKecvlSb2ajNwqpoqvKUrcry1tmIElf2cbZ58iqxi+0xsB15WaZO/NV
4KxVfMm8PCW6Vmob272oiQIDAQAB
-----END PUBLIC KEY-----`,
    jwt_private: `-----BEGIN RSA PRIVATE KEY-----
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
-----END RSA PRIVATE KEY-----`
};
exports.default = config;