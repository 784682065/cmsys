package com.huzp.cmsys;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan(basePackages = {"com.huzp.cmsys.*.dao"})
public class CmsysApplication {

	public static void main(String[] args) {
		System.out.println("第二次测试");
		SpringApplication.run(CmsysApplication.class, args);
	}
}
