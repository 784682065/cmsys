package com.huzp.cmsys.system.dao;

import com.huzp.cmsys.system.entity.ApplyCM;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

/**
 * @Author: huzp
 * @Description:
 * @Date: 16:13 2018/3/7
 * @Modified By:
 */
@Component
public interface ApplyCMDao {

    //保存申请信息
    void saveMes(ApplyCM applyCM);

    //查找所有未曾决策的申请信息
    List<Map<String,Object>> findAllMes();

    //根据id查找某一条Mes
    ApplyCM findMesById(Integer id);

    //根据id 更新申请的sign
    void  UpdateSignById(Integer arg0, String arg1);

    //根据id更新status
    void UpdateStatusById(Integer id);

    //根据社团名字查找是否有相同的社团
    String findCMByName (String cmname);


}
