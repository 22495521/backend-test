### 安裝套件

```bash
npm install
```

### 環境變數設定

請在終端機輸入 `cp .env.example .env` 來複製 .env.example 檔案，並依據 `.env` 內容調整相關欄位。

### 環境變數範例與說明

> 底下皆為假的資料，請依照自己的資料來設定

```bash
# 環境變數，區分開發環境或正式環境(development、production)
NODE_ENV = "development"

# 伺服器埠號
PORT = 3005

# MYSQL
MYSQL_HOST = localhost
MYSQL_USER = root
MYSQL_PASSWORD =
MYSQL_DATABASE =


```

### 運行專案

```bash
npm run dev
```

### 開啟專案

在瀏覽器網址列輸入以下即可看到畫面

```bash
http://localhost:3005/
```

## 資料夾說明

```txt
freyja
├─ develop                  // 開發工具、腳本
│  └─build.js              // 使用 esbuild 來編譯、打包專案
├─ public                   // 靜態資源放置處
├─ src
│  ├─ app                   // 入口點
│  ├─ controllers           // 控制器
│  ├─ routes                // 路由
│  ├─ utils                 // 工具
│  ├─ type                  // 型別
│  └─ reference.d.ts        // 全局型別定義
├─ .env.example             // 環境變數範例
├─ .gitignore               // Git 忽略檔案
├─ .prettierrc.json         // Prettier 設定檔
├─ Dockerfile               // Docker 設定檔
├─ package-lock.json
├─ package.json
└─ tsconfig.json
```

## 專案技術

-   node.js v20.8.9
-   tsx v3.14.0
-   esbuild v0.19.5
-   express v4.18.2
-   mysql2 v3.11.0

## 專案指令列表

```bash
# 開發指令 : 使用 tsx watch 來監聽檔案變化，並且自動編譯成 js 檔案，適用於開發環境
npm run dev

# 打包指令 : 使用 esbuild 來編譯、打包專案，適用於正式環境
npm run build

# 啟動指令 : 使用 node 來啟動專案，適用於正式環境
npm run start

```

## MYSQL 預設輸入指令

```bash
# 創建資料表
CREATE TABLE Tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    remarks TEXT,
    taskTime TIME,
    taskDate DATE,
    location VARCHAR(255),
    creator VARCHAR(255) NOT NULL
);

```

## Docker

本專案可以使用 Docker，只需要使用以下指令

```bash
# 使用 Docker 建立一個名為 "app:v1" 的容器映像
docker build -t app:v1 .

# 運行一個名為 "app:v1" 的容器，將容器內部的端口 3005 映射到主機的端口 3005
# 同時以後台模式運行容器
docker run -p 3005:3005 -d app:v1
```
