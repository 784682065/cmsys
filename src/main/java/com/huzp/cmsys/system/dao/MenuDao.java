package com.huzp.cmsys.system.dao;

import com.huzp.cmsys.system.node.MenuNode;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * @Author: huzp
 * @Description:
 * @Date: 16:33 2018/1/20
 * @Modified By:
 */
@Component
public interface MenuDao {

    /**
     * 根据角色获取菜单
     *
     * @param roleIds
     * @return
     * @date 2017年2月19日 下午10:35:40
     */
    List<MenuNode> getMenusByRoleIds(List<Integer> roleIds);
}
