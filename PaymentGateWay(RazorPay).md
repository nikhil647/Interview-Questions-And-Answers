# Payment Gateway (PG- Razorpay)

**Service Offered By Payment**
```
 One time (Course, book purchasing)
 Subscription (Netflix, Amazon Prime)
```
**How Does route in razor pay works ?**
```
Razor pay allow you to split payment between 3rd parties seller bank accounts.
Using Route you can easily manage settlement refund reconcillation and make vendor payment.
It is helpfull for business that disburse paymnet in 1 -many model.
```
***
**Process** - 
```
Test Mode:
Copy Public & Private key from razor pay.
Now at FE & BE we need to add keys.

At FE --> only public Keys.
At BE --> Both Keys.

FE when user click pay button call 
1) Load Razor pay checkout.js in browser.
2) take Order Id from BE (pass amount currency and receipt(any randome string)). (see BE section)
3) Form Object option and call razor pay function

const paymentObject = new window.Razorpay(options);
paymentObject.open();


BE when user click pay button call.
1) API for orders creation
2) Webhook for once payment done (or failed)

see github link for FE and BE code.

```
***