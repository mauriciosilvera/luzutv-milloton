import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import '../PollResults.css';

function BarGraph(props) {
  const { data, tooltip, isInMobile } = props;
  return isInMobile ? (
    <div className="graphContainer">
      <ResponsiveBar
        data={data}
        keys={['voteCount']}
        indexBy="mobileDisplay"
        margin={{ top: 50, bottom: 50, left: 50, right: 50 }}
        minValue="0"
        padding={0.2}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'pastel1' }}
        tooltip={(info) => tooltip(info?.data)}
        axisBottom={{
          tickSize: 0,
          tickPadding: 10,
          tickRotation: 0,
          legendPosition: 'middle',
          legendOffset: 0
        }}
      />
    </div>
  ) : (
    <div className="graphContainer">
      <ResponsiveBar
        data={data}
        keys={['voteCount']}
        indexBy="desktopDisplay"
        margin={{ top: 50, bottom: 50, left: 50, right: 50 }}
        minValue="0"
        padding={0.2}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'pastel1' }}
        tooltip={(info) => tooltip(info?.data)}
        axisBottom={{
          tickSize: 0,
          tickPadding: 10,
          tickRotation: 0,
          legendPosition: 'middle',
          legendOffset: 0
        }}
      />
    </div>
  );
}

export default BarGraph;
