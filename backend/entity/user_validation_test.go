package entity

import (
	"testing"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestUserLoginCorrect(t *testing.T) {
	g := NewGomegaWithT(t)

	userlogin := UserLogin{

		Username: "admin1",
		Password: "123456789za",
	}

	ok, err := govalidator.ValidateStruct(userlogin)

	g.Expect(ok).To(BeTrue())

	g.Expect(err).To(BeNil())

}

func TestUserdetailCorrect(t *testing.T) {
	g := NewGomegaWithT(t)

	UserDetail := UserDetail{

		FirstName:   "saharat",
		LastName:    "Juntarin",
		Nickname:    "Sakeezt",
		PhoneNumber: "0989515886",
		PromtPay:    "0989515776",
		PriceShutt:  25,
	}

	ok, err := govalidator.ValidateStruct(UserDetail)

	g.Expect(ok).To(BeTrue())

	g.Expect(err).To(BeNil())

}

func TestUsernameIncorect(t *testing.T) {
	g := NewGomegaWithT(t)

	fixtures := []string{
		"A",
		"BB",
		"EEE",
		"YYYY",
	}

	for _, fixture := range fixtures {
		username := UserLogin{
			Username: fixture,
			Password: "123456789za",
		}
		ok, err := govalidator.ValidateStruct(username)

		// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
		g.Expect(ok).ToNot(BeTrue())

		// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
		g.Expect(err).ToNot(BeNil())

		// err.Error ต้องมี error message แสดงออกมา
		g.Expect(err.Error()).To(Equal("Username must not be less than 5 characters"))
	}
}

func TestPasswordIncorect(t *testing.T) {
	g := NewGomegaWithT(t)

	fixtures := []string{
		"1235",
		"41556",
		"458945",
		"4589458",
	}

	for _, fixture := range fixtures {
		password := UserLogin{
			Username: "admin1",
			Password: fixture,
		}
		ok, err := govalidator.ValidateStruct(password)

		// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
		g.Expect(ok).ToNot(BeTrue())

		// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
		g.Expect(err).ToNot(BeNil())

		// err.Error ต้องมี error message แสดงออกมา
		g.Expect(err.Error()).To(Equal("Password must not be less than 8 characters"))
	}
}

func TestPriceShuttCorrect(t *testing.T) {
	g := NewGomegaWithT(t)

	fixtures := []float64{
		0,
		-5,
		-4,
		-2,
	}

	for _, fixture := range fixtures {

		PriceShutt := UserDetail{
			FirstName:   "saharat",
			LastName:    "Juntarin",
			Nickname:    "Sakeezt",
			PhoneNumber: "0989515886",
			PromtPay:    "0989515776",
			PriceShutt:  fixture,
		}
		ok, err := govalidator.ValidateStruct(PriceShutt)

		// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
		g.Expect(ok).ToNot(BeTrue())

		// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
		g.Expect(err).ToNot(BeNil())

		if err.Error() == "PriceShutt must not be zero" {
			g.Expect(err.Error()).To(Equal("PriceShutt must not be zero"))
		} else if err.Error() == "PriceShutt must not be negative" {
			g.Expect(err.Error()).To(Equal("PriceShutt must not be negative"))
		}
	}
}

func TestPhonenumberInCorrect(t *testing.T) {
	g := NewGomegaWithT(t)

	fixtures := []string{
		"A9",
		"B99",
		"Ccs55",
		"1592684886",
		"09558457789",
		"0955845778A",
	}
	for _, fixture := range fixtures {
		phonnumber := UserDetail{
			FirstName:   fixture,
			LastName:    "Juntarin",
			Nickname:    "Sakeezt",
			PhoneNumber: fixture,
			PromtPay:    "0989515776",
			PriceShutt:  25,
		}

		ok, err := govalidator.ValidateStruct(phonnumber)

		// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
		g.Expect(ok).ToNot(BeTrue())

		// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
		g.Expect(err).ToNot(BeNil())

	}
}

func TestPromtpayInCorrect(t *testing.T) {
	g := NewGomegaWithT(t)

	fixtures := []string{
		"A9",
		"B99",
		"Ccs55",
		"1592684886",
		"09558457789",
		"0955845778A",
	}
	for _, fixture := range fixtures {
		promtpay := UserDetail{
			FirstName:   fixture,
			LastName:    "Juntarin",
			Nickname:    "Sakeezt",
			PhoneNumber: "0989515776",
			PromtPay:    fixture,
			PriceShutt:  25,
		}

		ok, err := govalidator.ValidateStruct(promtpay)

		// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
		g.Expect(ok).ToNot(BeTrue())

		// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
		g.Expect(err).ToNot(BeNil())

	}
}
