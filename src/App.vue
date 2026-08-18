<template>
  <div>
    <div class="preview-banner" role="status">
      <span class="preview-banner__dot" aria-hidden="true" />
      Portfolio demo — Vue 2 UI, mock data only
    </div>

    <div class="preview-controls">
      <button
        type="button"
        :class="{ 'is-active': previewMode === 'player' }"
        @click="setPreviewMode('player')"
      >
        Player view
      </button>
      <button
        type="button"
        :class="{ 'is-active': previewMode === 'admin' }"
        @click="setPreviewMode('admin')"
      >
        Admin view
      </button>
    </div>

    <nav class="preview-quicknav" aria-label="Quick navigation">
      <span>Jump to:</span>
      <button type="button" @click="goToPage(0)">Selector</button>
      <button type="button" @click="goToForm(1)">Form</button>
      <button type="button" @click="goToPage(2)">Admin list</button>
      <button type="button" @click="goToPage(3)">Top staff</button>
      <button type="button" @click="openSampleDetail()">Detail</button>
    </nav>

    <p v-if="toast" class="preview-toast" role="status">{{ toast }}</p>

    <div class="report" v-if="show">
      <div class="report__stage-backdrop" aria-hidden="true" />

      <!-- Page 0: category selector -->
      <div class="report__selector" v-if="activePage === 0">
        <div class="report__back"><img src="/assets/img/back.svg" alt="" /></div>
        <div class="report__close" @click="closeMenu()"><img src="/assets/img/cross.svg" alt="" /></div>
        <div class="report__selector_button blue" @click="activePage = 1; type = 0">
          <h1>{{ t('PLAYER') }}</h1>
          <h2>{{ t('PLAYERDESC') }}</h2>
          <div class="report__selector_button-circles"></div>
          <img :src="categoryImages.player" alt="" />
        </div>
        <div class="report__selector_button red" @click="activePage = 1; type = 1">
          <h1>{{ t('BUG') }}</h1>
          <h2>{{ t('BUGDESC') }}</h2>
          <div class="report__selector_button-circles"></div>
          <img :src="categoryImages.bug" alt="" />
        </div>
        <div class="report__selector_button pink" @click="activePage = 1; type = 2">
          <h1>{{ t('QUESTION') }}</h1>
          <h2>{{ t('QUESTIONDESC') }}</h2>
          <div class="report__selector_button-circles"></div>
          <img :src="categoryImages.question" alt="" />
        </div>
      </div>

      <!-- Page 1: report form -->
      <div class="report__menu" v-if="activePage === 1">
        <div class="report__back" @click="activePage = 0"><img src="/assets/img/back.svg" alt="" /></div>
        <div class="report__close" @click="closeMenu()"><img src="/assets/img/cross.svg" alt="" /></div>

        <div class="report__menu_header">
          <div class="report__menu_header-main">
            <h1>{{ t(types[type][0]) }}</h1>
            <h2>{{ t(types[type][1]) }}</h2>
          </div>
          <div class="report__menu_header-right">
            <button class="pink" @click="type = 2">
              <div class="icon"><img src="/assets/img/icons/question.svg" alt="" /></div>
              Question
            </button>
            <button class="green" @click="type = 0">
              <div class="icon"><img src="/assets/img/icons/player.svg" alt="" /></div>
              Player
            </button>
            <button class="red" @click="type = 1">
              <div class="icon"><img src="/assets/img/icons/bug.svg" alt="" /></div>
              Bug
            </button>
          </div>
        </div>

        <div class="report__menu_content">
          <div class="report__menu_content-titleInput" :class="{ shake: titleIncorrect }">
            <div class="report__menu_content-titleInput_name">
              <img src="/assets/img/icons/user.svg" alt="" />
              <span>{{ t('Type_your_Title') }}</span>
            </div>
            <input type="text" v-model="report.title" :placeholder="t('Type_your_Title2')" />
          </div>
          <div class="report__menu_content-descInput" :class="{ shake: descIncorrect }">
            <img src="/assets/img/icons/description.svg" alt="" />
            <div class="report__menu_content-descInput_other">
              <textarea cols="30" rows="10" v-model="report.desc" :placeholder="t('Type_Your_Text')"></textarea>
            </div>
          </div>
          <h4>{{ t('Take_Screenshot') }}</h4>
          <div class="report__menu_content-screenshot" @click="takeScreenshot()">
            <div
              class="report__menu_content-screenshot_inner"
              v-if="srcPrev.length > 0"
              :style="{ background: `url('${srcPrev}')`, backgroundSize: 'cover' }"
            >
              <h1>{{ uploadText }}</h1>
            </div>
            <div class="report__menu_content-screenshot_inner" v-else>
              <img src="/assets/img/plus.svg" alt="" />
              <h1>{{ uploadText }}</h1>
            </div>
          </div>
          <button class="submit" @click="sendReport()" @keyup.enter="sendReport()">{{ t('Submit') }}</button>
        </div>
      </div>

      <!-- Page 2: admin reports list -->
      <div class="report__menu" v-if="activePage === 2">
        <div class="report__back" @click="activePage = 0"><img src="/assets/img/back.svg" alt="" /></div>
        <div class="report__close" @click="closeMenu()"><img src="/assets/img/cross.svg" alt="" /></div>

        <div class="report__menu_header">
          <div class="report__menu_header-main">
            <h1>{{ t('Reports') }}</h1>
            <h2>{{ t('ReportsDesc') }}</h2>
          </div>
          <div class="report__menu_header-right">
            <div class="report__menu_header-right_search">
              <img src="/assets/img/icons/search.svg" alt="" />
              <input type="text" :placeholder="t('Search')" v-model="searchInput" />
            </div>
            <button class="yellow" @click="openTopAdmins()">
              <div class="icon"><img src="/assets/img/icons/topadmins.svg" alt="" /></div>
              Top Admins
            </button>
            <div class="report__menu_header-right_sort">
              <img src="/assets/img/icons/sort.svg" alt="" />
              <div class="sorter-block">
                <div class="sorter-header" @click="isSortVisible = !isSortVisible">
                  {{ sortMods[sortMode] }}
                  <svg xmlns="http://www.w3.org/2000/svg" width="9" height="5" viewBox="0 0 9 5" fill="none">
                    <path d="M1 1L4.5 4L8 1" stroke="white" stroke-opacity="0.35" />
                  </svg>
                </div>
                <div class="sorter-items" v-if="isSortVisible">
                  <div
                    class="sorter-item"
                    v-for="item in sortMods"
                    :key="item"
                    @click="sortMode = sortMods.indexOf(item); isSortVisible = false"
                  >
                    {{ item }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="report__menu_content">
          <div class="report__menu_content-listNaming2">
            <span>{{ t('ID') }}</span>
            <span>{{ t('Name') }}</span>
            <span>{{ t('TYPE') }}</span>
            <span>{{ t('Status') }}</span>
            <span>{{ t('Action') }}</span>
          </div>
          <ul class="report__menu_content-list2">
            <li v-for="report in _reports" :key="report.id" class="green">
              <span>#{{ report.id }}</span>
              <span>{{ report.playername }}</span>
              <span>{{ t(types[report.type][0]) }}</span>
              <span>{{ report.status }}</span>
              <button @click="viewReport(report.id)">View</button>
            </li>
          </ul>
        </div>
      </div>

      <!-- Page 3: top admins -->
      <div class="report__menu" v-if="activePage === 3">
        <div class="report__back" @click="activePage = 2"><img src="/assets/img/back.svg" alt="" /></div>
        <div class="report__close" @click="closeMenu()"><img src="/assets/img/cross.svg" alt="" /></div>

        <div class="report__menu_header">
          <div class="report__menu_header-main">
            <h1>{{ t('Top_Admins') }}</h1>
            <h2>{{ t('Top_Admins_Desc') }}</h2>
          </div>
        </div>
        <div class="report__menu_content">
          <div class="report__menu_content-listNaming">
            <span>{{ t('ID') }}</span>
            <span>{{ t('Name') }}</span>
            <span>{{ t('Reports_Count') }}</span>
          </div>
          <ul class="report__menu_content-list">
            <li v-for="(admin, index) in admins" :key="admin.id">
              <span>#{{ index + 1 }}</span>
              <span>{{ admin.name }}</span>
              <span>{{ admin.reports }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Page 4: report detail -->
      <div class="report__menu" v-if="activePage === 4">
        <div class="report__back" @click="isAdmin ? (activePage = 2) : (activePage = 0)">
          <img src="/assets/img/back.svg" alt="" />
        </div>
        <div class="report__close" @click="closeMenu()"><img src="/assets/img/cross.svg" alt="" /></div>

        <div class="report__menu_header">
          <div class="report__menu_header-main">
            <h1>{{ t('Report') }}</h1>
            <h2>{{ t('Report_Desc') }}</h2>
          </div>
        </div>
        <div class="report__menu_content">
          <div class="report__menu_content-info">
            <div class="report__menu_content-line">
              <div class="report__menu_content-info_block">
                <div class="report__menu_content-info_block-v1">
                  <img src="/assets/img/icons/user.svg" alt="" />
                  <span>User name</span>
                </div>
                <span class="report__menu_content-info_block-v2">{{ reportInfo.playername }}</span>
              </div>
              <div class="report__menu_content-info_block">
                <div class="report__menu_content-info_block-v1">
                  <img src="/assets/img/icons/status.svg" alt="" />
                  <span>Status</span>
                </div>
                <span class="report__menu_content-info_block-v2">{{ reportInfo.status }}</span>
              </div>
            </div>
            <div class="report__menu_content-info_desc">
              <img src="/assets/img/icons/description.svg" alt="" />
              <div class="report__menu_content-info_desc-other">
                <h1>{{ t('Description') }}</h1>
                <h2>{{ reportInfo.desc }}</h2>
              </div>
            </div>
          </div>
          <img
            v-if="activePage === 4 && reportInfo.img !== 'none'"
            :src="reportInfo.img"
            class="report__menu_content-preview"
            alt="Report screenshot placeholder"
          />
          <div class="report__menu_content-admintools" v-if="isAdmin">
            <span>Admin Tools</span>
            <div class="report__menu_content-admintools_buttons">
              <button @click="runCommand('bring', reportInfo.id)">{{ t('BRING') }}</button>
              <button @click="runCommand('bring-back', reportInfo.id)">{{ t('BRING_BACK') }}</button>
              <button @click="runCommand('goto', reportInfo.id)">{{ t('GOTO') }}</button>
              <button @click="runCommand('goto-back', reportInfo.id)">{{ t('GOTO_BACK') }}</button>
              <button @click="runCommand('spect', reportInfo.id)">{{ t('Spectate') }}</button>
              <button @click="conclude(reportInfo.id)">{{ t('CONCLUDE') }}</button>
            </div>
          </div>
          <div class="report__menu_content-admintools" v-else>
            <span>Player Tools</span>
            <div class="report__menu_content-admintools_buttons">
              <button @click="closeTicket(reportInfo.id)">{{ t('FINISH') }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { MOCK_ADMINS, MOCK_REPORTS } from './mockData.js';
import { installMockNui, mockTakeScreenshot } from './mockNui.js';

const defaultConfig = {
  mainColor: '#bf112e',
  PLAYER: 'Player',
  PLAYERDESC: 'Report another player for rule violations',
  BUG: 'Bug',
  BUGDESC: 'Describe a technical issue you encountered',
  QUESTION: 'Question',
  QUESTIONDESC: 'Ask the staff team for help or guidance',
  PLAYER_REPORT: 'PLAYER REPORT',
  Title: 'Title',
  Screenshot: 'Screenshot',
  Description: 'Description',
  Take_Screenshot: 'Take Screenshot',
  Submit: 'Submit',
  Reports_List: 'Reports List',
  Top_Admins: 'Top Admins',
  Top_Admins_Desc: 'Staff members ranked by reports handled',
  Sort_BY: 'Sort BY',
  ID: 'ID',
  TYPE: 'TYPE',
  Status: 'Status',
  Name: 'Name',
  Action: 'Action',
  Top_Staffs: 'Top Staffs',
  Reports: 'Reports list',
  ReportsDesc: 'Manage incoming player reports and track status',
  Report: 'Report',
  Report_Desc: 'Review report details and take action',
  Reports_Count: 'Reports',
  Chat: 'Chat',
  Spectate: 'Spectate',
  GOTO: 'GOTO',
  BRING: 'BRING',
  CONCLUDE: 'FINISH',
  GOTO_BACK: 'GOTO BACK',
  BRING_BACK: 'BRING BACK',
  Waiting: 'Waiting',
  Cancel: 'Cancel',
  Plaese_Wait_For_Admin: 'Please wait for admin',
  checking: 'checking',
  uploaded: 'uploaded',
  uploading: 'uploading...',
  Type_your_Title: 'Your title',
  Type_your_Title2: 'Type Your Title...',
  Place_Image_URL: 'Place Image URL...',
  Type_Your_Text: 'Type Your Text...',
  Search: 'Search...',
  message: 'message...',
  FINISH: 'FINISH',
};

export default {
  name: 'ReportPreviewApp',
  data() {
    return {
      previewMode: 'player',
      toast: '',
      toastTimer: null,
      show: true,
      activePage: 0,
      type: 0,
      UiConfig: {},
      types: [
        ['PLAYER', 'PLAYERDESC'],
        ['BUG', 'BUGDESC'],
        ['QUESTION', 'QUESTIONDESC'],
      ],
      report: {
        title: '',
        desc: '',
        img: '',
      },
      admins: [],
      isSortVisible: false,
      sortMode: 0,
      sortMods: ['Id', 'Type', 'Status'],
      searchInput: '',
      reports: [...MOCK_REPORTS],
      titleIncorrect: false,
      descIncorrect: false,
      reportInfo: {
        playername: 'Demo Player',
        title: '',
        type: 'Bug',
        desc: 'Sample description for portfolio preview.',
        status: 'checking',
        img: 'none',
        id: '',
      },
      reportInfoInput: '',
      uploadedScreenshot: '',
      isAdmin: false,
      uploadText: 'Upload your screenshot here',
      srcPrev: '',
      categoryImages: {
        player: 'https://placehold.co/135x135/0082CB/ffffff?text=P',
        bug: 'https://placehold.co/117x117/CB0000/ffffff?text=B',
        question: 'https://placehold.co/98x98/FF2ED9/ffffff?text=Q',
      },
    };
  },
  computed: {
    _reports() {
      let sorted = this.reports.filter(
        (report) => report.status.toLowerCase() !== 'solved' && report.status.toLowerCase() !== 'resolved',
      );

      switch (this.sortMode) {
        case 0:
          sorted = sorted.sort((a, b) => (a.id > b.id ? 1 : -1));
          break;
        case 1:
          sorted = sorted.sort((a, b) =>
            this.types[a.type][0].localeCompare(this.types[b.type][0]),
          );
          break;
        case 2:
          sorted = sorted.sort((a, b) => a.status.localeCompare(b.status));
          break;
        default:
          break;
      }

      return sorted.filter(
        (item) =>
          item.playername.toLowerCase().includes(this.searchInput.toLowerCase()) ||
          item.status.toLowerCase().includes(this.searchInput.toLowerCase()),
      );
    },
  },
  methods: {
    t(id) {
      return this.UiConfig[id] || defaultConfig[id];
    },
    showToast(message) {
      this.toast = message;
      clearTimeout(this.toastTimer);
      this.toastTimer = setTimeout(() => {
        this.toast = '';
      }, 2200);
    },
    setPreviewMode(mode) {
      this.previewMode = mode;
      if (mode === 'admin') {
        this.isAdmin = true;
        this.activePage = 2;
        this.openTopAdmins();
      } else {
        this.isAdmin = false;
        this.activePage = 0;
      }
    },
    goToPage(page) {
      this.activePage = page;
      if (page === 3) this.openTopAdmins();
    },
    goToForm(typeIndex) {
      this.type = typeIndex;
      this.activePage = 1;
    },
    openSampleDetail() {
      this.isAdmin = true;
      this.viewReport(1042);
    },
    openTopAdmins() {
      fetch(`https://${GetParentResourceName()}/gettopadmins`, {
        method: 'POST',
        body: '',
      });
      this.activePage = 3;
    },
    closeMenu() {
      this.activePage = 0;
      this.resetForm();
      fetch(`https://${GetParentResourceName()}/close`, {
        method: 'POST',
        body: '',
      });
      this.showToast('Menu reset (mock close)');
    },
    resetForm() {
      this.uploadText = 'Upload your screenshot here';
      this.report = { title: '', desc: '', img: '' };
      this.srcPrev = '';
      this.uploadedScreenshot = '';
    },
    viewReport(id) {
      this.isAdmin = this.previewMode === 'admin' || this.isAdmin;
      fetch(`https://${GetParentResourceName()}/getreportdata`, {
        method: 'POST',
        body: JSON.stringify({ id }),
      });
    },
    closeTicket(id) {
      fetch(`https://${GetParentResourceName()}/reportcancel`, { method: 'POST' });
      fetch(`https://${GetParentResourceName()}/close`, { method: 'POST' });
      this.activePage = 0;
      this.resetForm();
      this.showToast(`Ticket #${id} closed (mock)`);
    },
    updateFeedback(reports) {
      this.reports = reports;
    },
    setReportData(data) {
      this.activePage = 4;
      this.reportInfo = data;
    },
    OpenReportMenu() {
      this.show = true;
      this.activePage = 0;
    },
    updateStaffs(staffs) {
      this.admins = staffs;
      this.admins.sort((a, b) => {
        if (a && b) return a.reports - b.reports;
        return 0;
      });
      this.admins.reverse();
    },
    OpenAdminFeedback() {
      this.show = true;
      this.activePage = 2;
      fetch(`https://${GetParentResourceName()}/gettopadmins`, {
        method: 'POST',
        body: '',
      });
    },
    sendReport() {
      if (this.report.title.length < 2) {
        this.titleIncorrect = true;
        setTimeout(() => {
          this.titleIncorrect = false;
        }, 2000);
        return;
      }
      if (this.report.desc.length < 2) {
        this.descIncorrect = true;
        setTimeout(() => {
          this.descIncorrect = false;
        }, 2000);
        return;
      }

      fetch(`https://${GetParentResourceName()}/newreport`, {
        method: 'POST',
        body: JSON.stringify({
          type: this.type,
          title: this.report.title,
          img: this.uploadedScreenshot,
          desc: this.report.desc,
        }),
      });

      this.activePage = 0;
      this.resetForm();
      this.showToast('Report submitted (mock)');
    },
    conclude(id) {
      this.activePage = 2;
      fetch(`https://${GetParentResourceName()}/conclude`, {
        method: 'POST',
        body: JSON.stringify({ id: Number(id) }),
      });
      fetch(`https://${GetParentResourceName()}/close`, { method: 'POST' });
      this.showToast(`Report #${id} concluded (mock)`);
    },
    takeScreenshot() {
      this.uploadText = this.t('uploading');
      mockTakeScreenshot().then((url) => {
        this.uploadText = this.t('uploaded');
        this.uploadedScreenshot = url;
        this.srcPrev = url;
      });
    },
    runCommand(command, id) {
      fetch(`https://${GetParentResourceName()}/${command}`, {
        method: 'POST',
        body: JSON.stringify({ reportid: Number(id) }),
      });
      this.showToast(`${command} executed (mock)`);
    },
  },
  mounted() {
    this.UiConfig = defaultConfig;
    installMockNui(this);
    this.updateStaffs([...MOCK_ADMINS]);

    fetch(`https://${GetParentResourceName()}/ready`, {
      method: 'POST',
      body: '',
    });
  },
};
</script>
