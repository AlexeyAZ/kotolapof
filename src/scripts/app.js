$(function() {

    if ($('input[type="range"]').length) {
        $('input[type="range"]').rangeslider({
            polyfill: false,
        });
    }

    webshim.setOptions('forms', {
        lazyCustomMessages: true,
        replaceValidationUI: true
    });
    webshim.polyfill('forms');

    function phoneLink() {
        var md = new MobileDetect(window.navigator.userAgent);
        var phoneLink = $("[data-phone]");

        if (md.mobile()) {
            phoneLink.attr("href", "tel:" + $(".phone-link").data("phone"));
            phoneLink.removeClass("js-small-btn");
            console.log("mobile")
        } else {
            phoneLink.attr("href", "");
            phoneLink.addClass("js-small-btn");
            console.log("pc")
        }
    }
    phoneLink();

    // form handler
    var body = $("body");
    var name;

    $("input[name=phone]").inputmask({
        "mask": "+9(999)999-9999",
        greedy: false,
    });

    body.on("click", ".js-small-btn", function(e) {
        e.preventDefault();

        if (!$(".thanks").length) {
            $("html").addClass("form-open");
            $(".form-wrap_small").addClass("form-wrap_open");
        }
    });

    body.on("click", function(e) {
        var self = $(e.target);
        
        if (self.hasClass("form-wrap_small") || self.hasClass("form__close")){
            $("html").removeClass("form-open");
            $(".form-wrap").removeClass("form-wrap_open");
        } else if(self.hasClass("form-wrap_big")) {
            location = "thanks.html";
        }
    });

    if (typeof wl != "undefined") {
        wl.callbacks.onFormSubmit = function ($form, res) {
            if ($form.data('next')) {
            
                if(res.status == 200) {
                    $(".form-wrap_open").removeClass("form-wrap_open");
                    $(".form-wrap_big").addClass("form-wrap_open");
                    $("html").addClass("form-open");

                    var selfName = $form.find("input[name=name]");
                    var formData = $form.serialize();

                    name = selfName.val();

                    $.ajax({
                        type: "POST",
                        url: "php/sendwe.php",
                        data: formData
                    });

                    if (name) {
                        localStorage.setItem("landclientname", name + ", наши");
                    } else {
                        localStorage.setItem("landclientname", "Наши");
                    }
                } else {  
                    wl.callbacks.def.onFormSubmit($form, res);
                }
            } else {
                location = "thanks.html";
            }
        };
    } else {
        $("#smallForm, #bottomForm").submit(function(e) {
            e.preventDefault();
            $(".form-wrap_open").removeClass("form-wrap_open");
            $(".form-wrap_big").addClass("form-wrap_open");
            $("html").addClass("form-open");

            var self = $(this);
            var selfName = self.find("input[name=name]");
            var selfPhone = self.find("input[name=phone]");
            var selfEmail = self.find("input[name=email]");
            var formData = self.serialize();

            name = selfName.val();

            $("[name=name1]").val(selfName.val());
            $("[name=phone1]").val(selfPhone.val());
            $("[name=email1]").val(selfEmail.val());

            $.when(
                $.ajax({
                    type: "POST",
                    url: "php/send.php",
                    data: formData,
                }),

                $.ajax({
                    type: "POST",
                    url: "php/sendwe.php",
                    data: formData,
                })
            );

            if (name) {
                localStorage.setItem("landclientname", name + ", наши");
            } else {
                localStorage.setItem("landclientname", "Наши");
            }
        });

        $("#bigForm").submit(function(e) {
            e.preventDefault();

            var self = $(this);
            var formData = self.serialize();

            $.ajax({
                type: "POST",
                url: "php/sendpresent.php",
                data: formData,
                success: function(data) {
                    location = "thanks.html";
                }
            });
        });
    }

    if ($("#thanksName").length) {
        $("#thanksName").text(localStorage.getItem("landclientname"));
    };
});

