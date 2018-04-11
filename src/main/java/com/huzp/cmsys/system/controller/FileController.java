package com.huzp.cmsys.system.controller;

import com.alibaba.fastjson.JSONObject;
import com.huzp.cmsys.base.BaseController;
import com.huzp.cmsys.shiro.ShiroKit;
import com.huzp.cmsys.support.HttpKit;
import com.huzp.cmsys.system.dao.MyFileDao;
import com.huzp.cmsys.system.entity.MyFile;
import com.huzp.cmsys.util.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;


/**
 * @Author: huzp
 * @Description: 文件上传和下载
 * @Date: 14:40 2018/1/31
 * @Modified By:
 */
@Controller
public class FileController extends BaseController{

    @Autowired
    MyFileDao myFileDao;


    /**
     * 打开upAnddownload页面
     * @return
     */
    @RequestMapping(value = {"/fileupanddownload","/"})
    public String filedownload(Model model,Page<MyFile>page){

        Integer username =Integer.parseInt(ShiroKit.getUser().getUsername());
        //根据usernmae查出他总共的文件数量
        Integer total = myFileDao.findTotalFile(username);
        page.setTotalCount(total);

        int offset = (page.getCurrentPage() - 1) * page.getPageSize();
        int limit = page.getPageSize();

        List<MyFile> myFileList = myFileDao.getMyFile(username,offset,limit);

        page.setDatas(myFileList);

        model.addAttribute("myFileList",myFileList);

        model.addAttribute("page",page);


        return  "/system/file/upanddownload";
    }

    /**
     * 文件上传
     * @param file
     * @return
     */
    @RequestMapping(value = "/upload")
    @ResponseBody
    public JSONObject upload(@RequestParam("file") MultipartFile file) {
        JSONObject jsonObject =new JSONObject();

        if (file.isEmpty()) {
            jsonObject.put("state","file is null");
            return jsonObject;
        }

        MyFile myFile= new MyFile();

        // 获取文件名
        String fileName = file.getOriginalFilename();

        // 文件上传后的路径
        String filePath = "E://test//"+ ShiroKit.getUser().getUsername()+"//";


        // 解决中文问题，liunx下中文路径，图片显示问题
        // fileName = UUID.randomUUID() + suffixName;
        File dest = new File(filePath + fileName);


        // 检测是否存在目录
        if (!dest.getParentFile().exists()) {
            //如果不存在就先创建目录
            dest.getParentFile().mkdirs();
        }
        try {

            //判断文件夹内是否有同名文件,若有则加上时间戳
            File filelist =new File("E://test//"+ ShiroKit.getUser().getUsername());
            System.out.println(filelist.toString());
            //遍历所有文件名字防止同名文件
            if(  null !=filelist.list() || filelist.list().length!=0  ){

                String  filenamelist[]  = filelist.list();

                for (int i=0; i < filenamelist.length;i++) {
                    if(filenamelist[i].equals(fileName)){

                        //因为有重复名字,所以将名字里添加时间戳
                        String fileName1 = fileName.substring(0,fileName.lastIndexOf("."));
                        String fileName2 = fileName.substring(fileName.lastIndexOf("."),fileName.length());
                        fileName=fileName1+System.currentTimeMillis()+fileName2;
                    }
                }
            }

            System.out.println("文件名字: "+fileName);
            System.out.println("文件路径: "+filePath);
            SimpleDateFormat sdf = new SimpleDateFormat("YYYY-MM-DD : HH:mm:ss");
            System.out.println("创建时间: "+sdf.format(new Date()));
            long length = file.getSize();
            double size = (double)length/(1024);
            //文件大小均已kb衡量
            String filesize = String.format("%.2f",size)+"KB";
            System.out.println("文件大小: "+filesize);

            //将文件信息存储
            myFile.setFilename(fileName);
            myFile.setFilepath(filePath);
            myFile.setFilecap(filesize);
            myFile.setCreatetime(new Date());
            System.out.println("username: "+ShiroKit.getUser().getUsername());
            myFile.setUsername(Integer.parseInt(ShiroKit.getUser().getUsername()));

            myFileDao.save(myFile);

            //因为文件名字可能有所变动所以重新创建dest
            dest = new File(filePath + fileName);

            file.transferTo(dest);
            jsonObject.put("state",SUCCESS);
            return jsonObject;

        } catch (IllegalStateException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        jsonObject.put("state",ERROR);
        return jsonObject;
    }


    /**
     * @description : 文件下载,默认下载到c/user/download
     * @return
     */
    @RequestMapping("/download")
    @ResponseBody
    public String download(@RequestParam("filename") String fileName) throws UnsupportedEncodingException {

        System.out.println(fileName);
        String filePath = myFileDao.getPathByName(fileName);
        System.out.println(filePath);

        if (fileName != null) {

            File file = new File(filePath, fileName);

            if (file.exists()) {
                HttpKit.getResponse().setContentType("application/force-download");// 设置强制下载不打开
                HttpKit.getResponse().addHeader("Content-Disposition",
                        "attachment;fileName=" + new String(fileName.getBytes(),"iso-8859-1"));// 设置文件名,字符编码为iso-8859-1 才是浏览器能识别的编码
                byte[] buffer = new byte[1024];
                FileInputStream fis = null;
                BufferedInputStream bis = null;
                try {
                    fis = new FileInputStream(file);
                    bis = new BufferedInputStream(fis);
                    OutputStream os = HttpKit.getResponse().getOutputStream();
                    int i = bis.read(buffer);
                    while (i != -1) {
                        os.write(buffer, 0, i);
                        i = bis.read(buffer);
                    }
                    System.out.println("success");
                } catch (Exception e) {
                    e.printStackTrace();
                } finally {
                    if (bis != null) {
                        try {
                            bis.close();
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }
                    if (fis != null) {
                        try {
                            fis.close();
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }
                }
            }

            return SUCCESS;
        }
        return ERROR;
    }


    @RequestMapping("delete")
    public String delete(@RequestParam("filename") String fileName){

        String filePath = myFileDao.getPathByName(fileName);

        //1.删除硬盘文件
        File file = new File(filePath, fileName);
        if(file.exists()){
            file.delete();
        }

        //2.删除数据库内容
        myFileDao.deleteFile(fileName);


        return REDIRECT+"/fileupanddownload";
    }


}
