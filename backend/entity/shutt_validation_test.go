package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestEventShuttCorrect(t *testing.T) {
	g := NewGomegaWithT(t)

	eventshutt := EventShutt{
		Place:     "Place",
		TimeStart: time.Now(),
		TimeStop:  time.Now(),
	}

	ok, err := govalidator.ValidateStruct(eventshutt)

	g.Expect(ok).To(BeTrue())

	g.Expect(err).To(BeNil())

}

func TestTimestartInCorrect(t *testing.T) {
	g := NewGomegaWithT(t)

	eventShutt := EventShutt{

		Place:     "PlaceA",
		TimeStart: time.Now().AddDate(0, 0, -1),
		TimeStop:  time.Now(),
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(eventShutt)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("TimeStart must not be in the past"))

}
func TestTimestopInCorrect(t *testing.T) {
	g := NewGomegaWithT(t)

	eventShutt := EventShutt{

		Place:     "PlaceA",
		TimeStart: time.Now(),
		TimeStop:  time.Now().AddDate(0, 0, -1),
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(eventShutt)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("TimeStop must not be in the past"))

}

// Group
func TestGroupCorrect(t *testing.T) {
	g := NewGomegaWithT(t)

	Group := Group{
		NameGroup: "GroupA",
		CodeGroup: "hkifg",
	}

	ok, err := govalidator.ValidateStruct(Group)

	g.Expect(ok).To(BeTrue())

	g.Expect(err).To(BeNil())

}

func TestPriceshuttInCorrect(t *testing.T) {
	g := NewGomegaWithT(t)
	fixtures := []float64{
		0,
		-5,
		-4,
		-2,
	}

	for _, fixture := range fixtures {

		shutt := ShuttleCock{
			Price: fixture,
		}
		ok, err := govalidator.ValidateStruct(shutt)

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