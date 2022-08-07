//code1

 //Loading the required module
import crypto from 'crypto';  // for generating bytes from the number
import base32Encode from 'base32-encode'; // for encoding the bytes into Unique ID as string type
import base32Decode from 'base32-decode';// for decoding the ID into bytes


 //Generating an ID without checksum as an instructive exercise
function generate_Id(byte_size) {
    const bytes = crypto.randomBytes(byte_size);
    return base32Encode(bytes, 'Crockford');
}

console.log('ID for byte size = 1:',generate_Id(1), '\n');
console.log('ID for byte size = 12:',generate_Id(12), '\n');
console.log('ID for byte size = 123:',generate_Id(123), '\n');



//code2
function calculate_checksum(bytes) {
    const intValue = BigInt(`0x${bytes.toString('hex')}`);
    return Number(intValue % BigInt(37));
}


//code3
function get_checksum_character(checksumValue) {
    const alphabet = '0123456789ABCDEFG' +
        'HJKMNPQRSTVWXYZ*~$=U'; // custom-built string  consisting of alphanumeric character
    return alphabet[Math.abs(checksumValue)]; // picking out an alphanumeric character
}


//code4

function generate_Id_with_checksum(bytes_size) {
    const bytes = crypto.randomBytes(bytes_size);
    const checksum = calculate_checksum(bytes);
    const checksumChar = get_checksum_character(checksum);
    console.log("checksum character: ", checksumChar); 
    const encoded = base32Encode(bytes, 'Crockford');
    return encoded + checksumChar;
}


const Hotel_resource_id =generate_Id_with_checksum(132)
console.log("Hotel resource id: ",Hotel_resource_id)



//code 5
// This function checks the integrity of the ID
function verify_Id(identifier) {
    const value = identifier.substring( 0, identifier.length-1);
    const checksum_char = identifier[identifier.length-1]; 
    //console.log(value,checksum_char);
    const buffer = Buffer.from( base32Decode(value, 'Crockford'));
    const calculated_checksum_char = get_checksum_character(calculate_checksum(buffer));
    console.log(calculated_checksum_char);
    const flag =calculated_checksum_char== checksum_char;


    return (flag);
    
     }

//const altered_Hotel_resource_id= Hotel_resource_id.replace('P','H');
console.log('\n');
console.log("computing checksum")
const flag = verify_Id(Hotel_resource_id);
if (flag) console.log("Checksums matched.");
else console.log("Checksums did not match.");








