/* eslint-disable no-undef */
import * as React from 'react';
import { VictoryStack, VictoryBar } from 'victory';
import { getTaskStatus, PipelineRun } from '../../utils/pipeline-augment';
import { Tooltip } from '../../../../components/utils/tooltip';

interface PipelineTaskStatusProps {
  pipelinerun: PipelineRun;
}

interface TaskStatusToolTipProps {
  tooltip: Tooltip;
}

interface Tooltip {
  Succeeded?: number;
  Running?: number;
  Failed?: number;
  Notstarted?: number;
  FailedToStart?: number;
}

//The colors are not final. pf-colors are not supported in the charts
export const mapColorMessage = {
  Succeeded: { color: 'green', message: 'Succeded' },
  Running: { color: '#0066cc', message: 'Running' },
  Failed: { color: 'red', message: 'Failed' },
  Notstarted: { color: '#ccc', message: 'Not Started Yet' },
  FailedToStart: { color: 'red', message: 'PipelineRun Failed To Start' },
};

const getMessage = (status: string, value: number = 0): string => {
  if (status === 'Notstarted' || status === 'FailedToStart') {
    return mapColorMessage[status].message;
  }
  return `${value} ${mapColorMessage[status].message} task(s).`;
};

export const TaskStatusToolTip: React.FC<TaskStatusToolTipProps> = (props) => {
  const { tooltip } = props;
  return (
    <div>
      {Object.keys(tooltip).map((status) => {
        return (
          <div className="row" key={status}>
            <div className="col-lg-1 col-md-1 offset-lg-1 offset-md-1">
              <i
                className="fa fa-square fa-2x"
                aria-hidden="true"
                style={{ color: mapColorMessage[status].color }}
              />
            </div>
            <div className="col-lg-9 col-md-9  offset-lg-1 offset-md-1">
              {getMessage(status, tooltip[status])}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const PipelineTaskStatus: React.FC<PipelineTaskStatusProps> = (props) => {
  const { bars, tooltip } = getTaskStatus(props.pipelinerun);
  return (
    <div>
      <Tooltip
        content={[<TaskStatusToolTip key={Math.floor(100 * Math.random())} tooltip={tooltip} />]}
      >
        <VictoryStack horizontal height={35} padding={0} domainPadding={0}>
          {bars.map((bar, i) => {
            return (
              <VictoryBar
                key={bar + i}
                data={[{ x: 2, y: 1 }]}
                barRatio={0.9}
                barWidth={35}
                padding={{ right: 15 }}
                style={{ data: { fill: mapColorMessage[bar].color } }}
              />
            );
          })}
        </VictoryStack>
      </Tooltip>
    </div>
  );
};
