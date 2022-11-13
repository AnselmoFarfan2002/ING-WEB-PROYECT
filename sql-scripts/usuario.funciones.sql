use LOCAL_DB;
-- SET GLOBAL log_bin_trust_function_creators = 1;

DELIMITER $$ 
drop function if exists validar_credenciales;
drop function if exists validar_registro;
drop function if exists get_car_id;

create function validar_credenciales( email varchar(40), pass varchar(40), keyword varchar(25) ) returns tinyint begin
	-- not found: -1 
    -- wrong pass: 0
    -- successful: 1
    
	if ( select COUNT( USU_ID ) from USUARIO where USU_CORREO = email ) > 0 then
		return ( select COUNT( USU_ID ) from USUARIO where USU_CORREO = email and pass = cast(aes_decrypt( USU_CONTRASENIA, keyword ) as char ) );
	else 
		return -1;
    end if;
end;

create function validar_registro(email varchar(40), ruc varchar(11)) returns tinyint begin
	-- failure: -1 
    -- successful: 1
    
	if (select count(EMP_RUC) from EMPRESA where EMP_RUC = ruc) > 0 then
		if (select count(USU_CORREO) from USUARIO where UCASE(USU_CORREO) = UCASE(email)) > 0 then
			return -1;
		else 
			return 1;
		end if;
	else
		return 1;
    end if;
end;
 -- select validar_registro('jamesrod19@gmail.com','09876543121');
 
create function get_car_id() returns tinyint begin
    return (select CAR_ID FROM CARGO ORDER BY CAR_ID DESC LIMIT 1);
end;

$$