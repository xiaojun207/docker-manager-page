FROM node:13.8.0-slim

ADD ./package* /app/

#cd到app文件夹下
WORKDIR /app

#安装项目依赖包
RUN npm install
RUN npm rebuild node-sass --force

#ADD . /app/

#配置环境变量
ENV HOST 0.0.0.0
ENV PORT 3001

#容器对外暴露的端口号
EXPOSE 3001

#容器启动时执行的命令 每个Dockerfile只有一个CMD命令 多了则会覆盖之前的CMD
CMD ["npm", "run","dev"]
