package com.example.demo.Converter;

import com.example.demo.DTO.ProductDTO;
import com.example.demo.DTO.UserDTO;
import com.example.demo.Data.Product;
import com.example.demo.Data.User;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

public class EntityToDto {



    ModelMapper modelMapper;



    @Autowired
    public EntityToDto(){
        this.modelMapper=modelMapper;
    }


    public UserDTO userToUserDTO(User user){
        return modelMapper.map(user,UserDTO.class);

    }

    public User userDtoToUser(UserDTO userDTO)
    {
        return modelMapper.map(userDTO,User.class);
    }

    public ProductDTO productToProductDTO(Product product){
        return modelMapper.map(product , ProductDTO.class);
    }

    public Product productDTOToProduct(ProductDTO productDTO){
        return modelMapper.map(productDTO , Product.class);
    }










}
