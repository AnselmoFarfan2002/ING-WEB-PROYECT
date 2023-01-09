drop procedure if exists post_car_cargo;		-- registra un cargo
DELIMITER $$
create procedure post_car_cargo( 
	idCargo tinyint unsigned ,
	CAR_NOMBRE varchar(100)
) begin
	INSERT INTO CARGO VALUES (idCargo, CAR_NOMBRE, 1);
end; $$

ALTER TABLE `local_db`.`cargo` 
CHANGE COLUMN `CAR_NOMBRE` `CAR_NOMBRE` VARCHAR(100) NULL DEFAULT NULL ;