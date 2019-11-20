var Personal_information = {"accountName" : "泮晨曦",
                            "gender" : "女",
                            "householdRegister":"龙泉",
            				"address":"浙江省龙泉市",
                    		"certificates":"身份证",
                			"identificationNumber":"332502199903191922",
            				"openingDate":"2019-02-02",
        					"openingPlace":"龙泉",
        				    "openBank":"中国一鸣银行龙泉支行营业部",
            				"cardNumber":"601724558249849",
            				"balance":"2000"
                    		};
var Personal_information;

/*测试使用*/
$("#AccountName").val(Personal_information.accountName);
$("#Gender").val(Personal_information.gender);
$("#HouseholdRegister").val(Personal_information.householdRegister);
$("#Address").val(Personal_information.address);
$("#Certificates").val(Personal_information.certificates);
$("#IdentificationNumber").val(Personal_information.identificationNumber);
$("#OpeningDate").val(Personal_information.openingDate);
$("#OpeningPlace").val(Personal_information.openingPlace);
$("#OpenBank").val(Personal_information.openBank);
$("#CardNumber").val(Personal_information.cardNumber);
$("#balance").html(Personal_information.balance);
/*测试使用*/

window.onload = function () {

    $.ajax({
        url: '',  //获取储户个人信息
        type: 'post',
        scriptCharset: 'utf-8',
        success: function (result) {
            Personal_information = result.Personal_information;
            $("#AccountName").val(Personal_information.accountName);
            $("#Gender").val(Personal_information.gender);
            $("#HouseholdRegister").val(Personal_information.householdRegister);
            $("#Address").val(Personal_information.address);
            $("#Certificates").val(Personal_information.certificates);
            $("#IdentificationNumber").val(Personal_information.identificationNumber);
            $("#OpeningDate").val(Personal_information.openingDate);
            $("#OpeningPlace").val(Personal_information.openingPlace);
            $("#OpenBank").val(Personal_information.openBank);
            $("#CardNumber").val(Personal_information.cardNumber);
            $("#balance").html(Personal_information.balance);
        },
        error: function () {
            layer.msg("请求失败！");
        }
    });


};