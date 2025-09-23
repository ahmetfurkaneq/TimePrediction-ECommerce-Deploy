package com.example.demo.DTO;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.*;


@AllArgsConstructor
@Getter
@Setter

public class ProductDTO {

    private long id;

    @NotBlank(message = "Urun adi bos birakilamaz")
    private String name;

    @DecimalMin(value = "0.0", inclusive = false, message = "Fiyat 0'dan büyük olmalı")
    private double price;

    @Min(value = 0, message = "Stok negatif olamaz")
    private int stock;

    private String category;




    public ProductDTO(){

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

}
