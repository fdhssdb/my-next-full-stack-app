import { NextResponse } from "next/server";
import dayjs from "dayjs";
import path from "path";
import fs from "fs";
import { randomUUID } from "crypto";

const saveFile = async (blob) => {
  console.log(blob);
  const dirName = "/uploads/" + dayjs().format("YYYY-MM-DD");
  const uploadDir = path.join(process.cwd(), "public" + dirName); //拼接生成目录
  fs.mkdirSync(uploadDir, {
    recursive: true, //true表示允许创建多级目录
  }); //创建目录
  const fileName = randomUUID() + ".png";
  const arrayBuffer = await blob.arrayBuffer();
  fs.writeFileSync(uploadDir + "/" + fileName, new DataView(arrayBuffer)); //存本地
  return dirName + "/" + fileName;
};

export const POST = async (req) => {
  const data = await req.formData();
  const fileName = await saveFile(data.get("file"));
  return NextResponse.json({
    errno: 0, //注意：值是数字，不能是字符串
    data: {
      url: fileName, //图片src，必须
      // alt: "yyy", //图片描述文字，非必须
      // href: "zzz", //图片链接，非必须
    },
  });
};
