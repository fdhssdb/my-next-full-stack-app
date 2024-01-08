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
  console.log(data.get("file"));
  console.log(data);
  const fileName = await saveFile(data.get("file"));
  return NextResponse.json({
    success: true,
    errorMessage: "文件上传成功",
    data: fileName,
  });
};
