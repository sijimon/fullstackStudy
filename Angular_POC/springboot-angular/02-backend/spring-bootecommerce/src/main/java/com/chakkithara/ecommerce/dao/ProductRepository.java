package com.chakkithara.ecommerce.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.chakkithara.ecommerce.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long>{
	

}
