package com.huzp.cmsys.util;

import java.util.ArrayList;
import java.util.List;

/**
 * 自定义分页组件
 *
 * @author CJ
 * @param <T>
 */
public class Page<T> {

    public enum Sort {
        ASC, DESC;
    }

    private List<T> datas = new ArrayList<T>(0);
    private boolean hasPreviousPage;
    private boolean hasNextPage;
    private int totalCount; // 总记录数
    private int totalPageCount; // 总页数
    private int currentPage = 1; // 当前第几页
    private int pageSize = 5; // 每页记录数
    private Enum<Sort> sort;

    public void gotoPreviousPage() // 向前翻页
    {
        if (isHasPreviousPage()) {
            currentPage = currentPage - 1;
        }
    }

    public void gotoNextPage() // 向后翻页
    {
        if (isHasNextPage()) {
            currentPage = currentPage + 1;
        }
    }

    public void gotoFirstPage() // 跳向首页
    {
        currentPage = 1;
    }

    public void gotoLastPage() // 跳向尾页
    {
        currentPage = totalPageCount;
    }

    public List<T> getDatas() {
        return datas;
    }

    public void setDatas(List<T> datas) {
        this.datas = datas;
    }

    public boolean isHasPreviousPage() {
        if (currentPage > 1) {
            hasPreviousPage = true;
        } else {
            hasPreviousPage = false;
        }
        return hasPreviousPage;
    }

    public void setHasPreviousPage(boolean hasPreviousPage) {
        this.hasPreviousPage = hasPreviousPage;
    }

    public boolean isHasNextPage() {
        if (currentPage < getTotalPageCount()) {
            hasNextPage = true;
        } else {
            hasNextPage = false;
        }
        return hasNextPage;
    }

    public void setHasNextPage(boolean hasNextPage) {
        this.hasNextPage = hasNextPage;
    }

    public int getTotalCount() {
        return totalCount;
    }

    public void setTotalCount(int totalCount) {
        this.totalCount = totalCount;
    }

    public int getTotalPageCount() {
        if (totalCount % pageSize == 0) {
            totalPageCount = totalCount / pageSize; // 总记录数 / 每页显示的数量 = 总页数
        } else {
            totalPageCount = totalCount / pageSize + 1; // 总记录数 / 每页显示的数量 =
            // 总页数+1
        }
        return totalPageCount;
    }

    public void setTotalPageCount(int totalPageCount) {
        this.totalPageCount = totalPageCount;
    }

    /**
     * 防止当前页码的游标越界
     */
    public int getCurrentPage() {
        if(this.currentPage > this.getTotalPageCount()){
            currentPage = this.getTotalPageCount();
        }
        return this.currentPage <= 0 ? 1 : this.currentPage;
    }

    public void setCurrentPage(int currentPage) {
        this.currentPage = currentPage;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public Enum<Sort> getSort() {
        return sort;
    }

    public void setSort(Enum<Sort> sort) {
        this.sort = sort;
    }

    /**
     * 冗余一个get方法用于thymeleaf前端反射调用
     */
    public boolean getHasPreviousPage() {
        if (currentPage > 1) {
            hasPreviousPage = true;
        } else {
            hasPreviousPage = false;
        }
        return hasPreviousPage;
    }

    /**
     * 冗余一个get方法用于thymeleaf前端反射调用
     */
    public boolean getHasNextPage() {
        if (currentPage < getTotalPageCount()) {
            hasNextPage = true;
        } else {
            hasNextPage = false;
        }
        return hasNextPage;
    }

}