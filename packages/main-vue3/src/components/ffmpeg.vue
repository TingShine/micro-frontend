<template>
  <div class="h-full w-full p-6 ">
    <div class="h-full bg-white overflow-y-auto p-5">
      <div class="flex mt-20">
        <div class="w-1/2 text-center font-bold text-xl mr-20">
          <div>Webm</div>
          <video class="w-full h-40" :src="videoURL" controls></video>
        </div>
        <div class="w-1/2 text-center font-bold text-xl">
          <div>Mp4</div>
          <video class="w-full h-40" :src="video" controls></video>
        </div>
      </div>

      <div class="mt-20">
        <t-steps :current="current" status="process" class="steps-demos-extra">
          <t-step-item title="初始阶段">
            <template v-if="current === 0" #extra>
              <t-button :loading="loading" variant="base" @click="handleLoad">
                加载wasm资源
              </t-button>
            </template>
          </t-step-item>
          <t-step-item title="ffmpeng已加载">
            <template v-if="current === 1" #extra>
              <t-button
                :loading="loading"
                variant="base"
                @click="handleDownLoad"
              >
                加载音视频资源
              </t-button>
            </template>
          </t-step-item>
          <t-step-item title="音视频资源已加载">
            <template v-if="current === 2" #extra>
              <t-button
                :loading="loading"
                variant="base"
                @click="handleTransfer"
              >
                转换mp4
              </t-button>
            </template>
          </t-step-item>
          <t-step-item title="转换成功"> </t-step-item>
        </t-steps>
      </div>

      <div v-show="log" class="mt-20 p-4 bg-black text-white text-left border-spacing-2  brad">
        {{ log }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { FFmpeg } from "@ffmpeg/ffmpeg";
import type { LogEvent } from "@ffmpeg/ffmpeg/dist/esm/types";
import { toBlobURL, fetchFile } from "@ffmpeg/util";
import { ref, defineComponent } from "vue";

// @ts-ignore
const baseURL = `${window.STATIC_ENV_CONFIG.RESOURCE_CDN}/wasm`;

export default defineComponent({
  setup() {
    const current = ref(0);
    const log = ref('')

    const ffmpeg = new FFmpeg();
    ffmpeg.on("log", ({ message: msg }: LogEvent) => {
      log.value += `${msg}\n`
    });

    const loading = ref(false);
    const video = ref<any>("");

    const videoURL =
      "https://raw.githubusercontent.com/ffmpegwasm/testdata/master/Big_Buck_Bunny_180_10s.webm";

    async function handleLoad() {
      loading.value = true;
      await ffmpeg.load({
        coreURL: await toBlobURL(
          `${baseURL}/ffmpeg-core.js`,
          "text/javascript"
        ),
        wasmURL: await toBlobURL(
          `${baseURL}/ffmpeg-core.wasm`,
          "applicaiton/wasm"
        ),
        workerURL: await toBlobURL(
          `${baseURL}/ffmpeg-core.worker.js`,
          "text/javascript"
        ),
      });
      loading.value = false;
      current.value++;
    }

    const handleDownLoad = async () => {
      loading.value = true;
      await ffmpeg.writeFile(
        "Big_Buck_Bunny_180_10s.webm",
        await fetchFile(videoURL)
      );
      loading.value = false;
      current.value++;
    };

    const handleTransfer = async () => {
      loading.value = true;
      await ffmpeg.exec(["-i", "Big_Buck_Bunny_180_10s.webm", "test.mp4"]);
      const data = await ffmpeg.readFile("test.mp4");
      video.value = URL.createObjectURL(
        new Blob([(data as Uint8Array).buffer], { type: "video/mp4" })
      );
      loading.value = false;
      current.value++;
    };

    return {
      loading,
      videoURL,
      video,
      current,
      log,
      handleLoad,
      handleDownLoad,
      handleTransfer,
    };
  },
});
</script>
