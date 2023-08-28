<template>
  <div class="p-4 h-full">
    <div class="h-full bg-white p-8">
      <div class="mt-10 text-center font-bold text-3xl">
        JS VS Rust
      </div>
      <div class="mt-10 w-1/2 m-auto">
        <t-table bordered stripe :columns="columns" row-key="index" table-layout="auto" :data="tableData" :foot-data="[{}]">
          <template #compare="{ col, row }">
            <div class="font-bold">{{ row.winner  }}</div>
          </template>
        </t-table>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import * as wasm from 'my-rust-wasm';

const addRange = (num: number): number => {
  let sum = 0;

  let index = 0;
  while (++index <= num) {
    sum += index;
  }

  return sum;
}

const fibRec = (num: number): number => {
  if (num <= 2) {
    return num;
  }

  return fibRec(num - 1) + fibRec(num - 2)
}

const fib = (num: number): number => {
  if (num <= 2) {
    return num;
  }

  let pre = 1;
  let next = 2;
  let index = 2;
  while (++index <= num) {
    const temp = next
    next += pre
    pre = temp
  }

  return next;
}

const columns = ref([
  { colKey: 'algorithm', title: 'Algorithm', foot: '-' },
  { colKey: 'js', title: 'JavaScript / Duration', foot: '-' },
  { colKey: 'rust', title: 'Rust-Wasm / Duration', foot: '-' },
  { colKey: 'compare', title: 'Compare', cell: 'compare' }
])

const data = ref([
  { index: 0, algorithm: '叠加数(while) n=1000000', js: '0', rust: '0', compare: '-' },
  { index: 1, algorithm: '斐波那契(迭代) n=5', js: '0', rust: '0', compare: '-' },
  { index: 2, algorithm: '斐波那契(迭代) n=30', js: '0', rust: '0', compare: '-' },
  { index: 3, algorithm: '斐波那契(动态规划) n=30', js: '0', rust: '0', compare: '-' },
])

const caculateForTenTimes = async (func) => {
  const start = performance.now()
  let times = 10;

  let result = null
  for (let i = 0; i < times; i++) {
    result = func()
  }


  const duration = ((performance.now() - start) / times).toFixed(4)
  console.log(result, duration);

  return [result, duration]
}

onMounted(async () => {
  const [result1, duration1] = await caculateForTenTimes(addRange.bind(this, 1000000))
  data.value[0].js = `${result1} / ${duration1} ms`
  const [result2, duration2] = await caculateForTenTimes(wasm.add_range.bind(this, 100000))
  data.value[0].rust = `${result2} / ${duration2} ms`


  const [result5, duration5] = await caculateForTenTimes(fibRec.bind(this, 5))
  data.value[1].js = `${result5} / ${duration5} ms`
  const [result6, duration6] = await caculateForTenTimes(wasm.fib_rec.bind(this, 5))
  data.value[1].rust = `${result6} / ${duration6} ms`

  const [result3, duration3] = await caculateForTenTimes(fibRec.bind(this, 30))
  data.value[2].js = `${result3} / ${duration3} ms`
  const [result4, duration4] = await caculateForTenTimes(wasm.fib_rec.bind(this, 30))
  data.value[2].rust = `${result4} / ${duration4} ms`

  const [result7, duration7] = await caculateForTenTimes(fib.bind(this, 30))
  data.value[3].js = `${result7} / ${duration7} ms`
  const [result8, duration8] = await caculateForTenTimes(wasm.fib.bind(this, 30))
  data.value[3].rust = `${result8} / ${duration8} ms`
})

const tableData = computed(() => {
  return data.value.map(val => {
    
    if (val.js === '0' || val.rust === '0') {
      return { ...val, winner: '-' }
    }

    const  js = Number(val.js.split('/')[1].split('ms')[0].trim());
    const rust = Number(val.rust.split('/')[1].split('ms')[0].trim())
    const winner = js < rust ? 'JS' : 'Rust'

    return {...val, winner}
  })
})
</script>