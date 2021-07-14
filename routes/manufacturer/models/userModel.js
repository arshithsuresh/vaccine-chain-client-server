let UserModel = function(username, publicKey, name){
    this.username = username
    this.publicKey = publicKey
    this.name = name
}

UserModel.prototype.getPublicKey = ()=>{
    return this.publicKey
}

UserModel.prototype.toJson = ()=>{

}

