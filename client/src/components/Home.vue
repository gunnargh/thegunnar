<template>
  <div>
    <div class="list-items">
        <p>Current week of the year: {{ Weekdata }}</p>
        <transition name="fade" mode="out-in">
          <div v-if="time1">
            <p> {{isLyear}} </p>
            <p> {{shortdate}} is week: {{newWeekdata}}</p>
          </div>
        </transition>
      <date-picker v-model="time1" :first-day-of-week="1" lang="en"></date-picker>
    </div>
  </div>
</template>

<script>
import DatePicker from "vue2-datepicker";

export default {
  components: { DatePicker },
  name: "Home",
  data() {
    return {
      Weekdata: "",
      newWeekdata: "",
      time1: null,
      shortdate: null,
      isLyear: null,
      shortcuts: [
        {
          text: "Today",
          start: new Date(),
          end: new Date()
        }
      ]
    };
  },
  methods: {
    Week: function() {
      var date = new Date();
      date.setHours(0, 0, 0, 0);
      date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
      var week1 = new Date(date.getFullYear(), 0, 4);
      this.Weekdata =
        1 +
        Math.round(
          ((date.getTime() - week1.getTime()) / 86400000 -
            3 +
            (week1.getDay() + 6) % 7) /
            7
        );
    },
    WeekFunc: function(date) {
      date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
      var week1 = new Date(date.getFullYear(), 0, 4);
      this.shortdate = date.toLocaleDateString();
      this.newWeekdata =
        1 +
        Math.round(
          ((date.getTime() - week1.getTime()) / 86400000 -
            3 +
            (week1.getDay() + 6) % 7) /
            7
        );
    },
    getWeekYear: function() {
      var date = new Date(this.getTime());
      date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
      return date.getFullYear();
    }
  },
  created: function() {
    this.Week();
  },
  watch: {
    time1: function(val) {
      this.WeekFunc(val);
      if (new Date(this.time1.getFullYear(), 1, 29).getDate() === 29) {
        this.isLyear = "It's a leap year!";
      } else {
        this.isLyear = "It's not a leap year!";
      }
    }
  }
};
</script>

<style>
.list-complete-item {
  transition: all 1s;
  display: inline-block;
}

.list-items {
  width: 100vw;
  text-align: center;
  margin: 0;
  padding-top: 35vh;
  margin: auto;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
